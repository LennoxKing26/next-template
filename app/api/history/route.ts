// app/api/history/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import EditHistory from '@/models/EditHistory';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const history = await EditHistory.find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(50).lean();

    return NextResponse.json({ history }, { status: 200 });
  } catch (error: any) {
    console.error('Get history error:', error);
    return NextResponse.json({ error: 'Failed to get history', details: error.message }, { status: 500 });
  }
}
