// app/api/edit-image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import EditHistory from '@/models/EditHistory';

const WAVESPEED_API_KEY = process.env.WAVESPEED_KEY;
const WAVESPEED_URL = process.env.WAVESPEED_URL;

async function submitTask(prompt: string, images: string[]) {
  if (!WAVESPEED_API_KEY || !WAVESPEED_URL) {
    throw new Error('Missing WAVESPEED_KEY or WAVESPEED_URL environment variables');
  }

  const payload = {
    prompt,
    images,
    seed: -1,
    output_format: 'jpeg',
    enable_base64_output: false,
    enable_sync_mode: false,
  };

  const response = await fetch(`${WAVESPEED_URL}/wavespeed-ai/qwen-image/edit-2511`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WAVESPEED_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to submit task: ${response.status}, ${text}`);
  }

  const result = await response.json();
  const requestId = result?.data?.id;

  if (!requestId) {
    throw new Error('No request ID returned from API');
  }

  return requestId;
}

async function getResult(requestId: string) {
  if (!WAVESPEED_API_KEY || !WAVESPEED_URL) {
    throw new Error('Missing WAVESPEED_KEY or WAVESPEED_URL environment variables');
  }

  const response = await fetch(`${WAVESPEED_URL}/predictions/${requestId}/result`, {
    headers: {
      Authorization: `Bearer ${WAVESPEED_API_KEY}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to get result: ${response.status}, ${text}`);
  }

  const result = await response.json();
  const data = result?.data;
  const status = data?.status;

  return {
    status,
    resultUrl: data?.outputs?.[0],
    error: data?.error,
  };
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { prompt, images } = await request.json();

    if (!prompt || !images || !Array.isArray(images)) {
      return NextResponse.json({ error: 'Invalid request: prompt and images are required' }, { status: 400 });
    }

    if (images.length < 1 || images.length > 3) {
      return NextResponse.json({ error: 'Images array must contain 1-3 items' }, { status: 400 });
    }

    await dbConnect();

    // Submit task to AI API
    const requestId = await submitTask(prompt, images);

    // Save to database
    const editHistory = await EditHistory.create({
      userId: session.user.id,
      prompt,
      images,
      requestId,
      status: 'processing',
    });

    return NextResponse.json(
      {
        id: editHistory._id.toString(),
        requestId,
        status: 'processing',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Edit image error:', error);
    return NextResponse.json({ error: 'Failed to process image', details: error.message }, { status: 500 });
  }
}

// Poll for result
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    await dbConnect();

    const editHistory = await EditHistory.findById(id);

    if (!editHistory) {
      return NextResponse.json({ error: 'Edit history not found' }, { status: 404 });
    }

    if (editHistory.userId.toString() !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // If already completed or failed, return cached result
    if (editHistory.status === 'completed' || editHistory.status === 'failed') {
      return NextResponse.json({
        id: editHistory._id.toString(),
        status: editHistory.status,
        resultUrl: editHistory.resultUrl,
        error: editHistory.error,
      });
    }

    // Poll API for result
    if (editHistory.requestId) {
      const result = await getResult(editHistory.requestId);

      if (result.status === 'completed') {
        editHistory.status = 'completed';
        editHistory.resultUrl = result.resultUrl;
        await editHistory.save();
      } else if (result.status === 'failed') {
        editHistory.status = 'failed';
        editHistory.error = result.error || 'Unknown error';
        await editHistory.save();
      }

      return NextResponse.json({
        id: editHistory._id.toString(),
        status: editHistory.status,
        resultUrl: editHistory.resultUrl,
        error: editHistory.error,
      });
    }

    return NextResponse.json({
      id: editHistory._id.toString(),
      status: editHistory.status,
    });
  } catch (error: any) {
    console.error('Get result error:', error);
    return NextResponse.json({ error: 'Failed to get result', details: error.message }, { status: 500 });
  }
}
