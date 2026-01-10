// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OSS from 'ali-oss';
import { randomUUID } from 'crypto';
import path from 'path';

const client = new OSS({
  accessKeyId: process.env.FILE_ACCESS_KEY_ID!,
  accessKeySecret: process.env.FILE_ACCESS_KEY_SECRET!,
  endpoint: process.env.FILE_ENDPOINT!,
  bucket: process.env.FILE_BUCKET_NAME!,
  secure: true,
  timeout: 500000,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const dir = (formData.get('dir') as string) || 'uploads';

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    if (files.length > 3) {
      return NextResponse.json({ error: 'Maximum 3 files allowed' }, { status: 400 });
    }

    const urls: string[] = [];

    for (const file of files) {
      if (file.size > 20 * 1024 * 1024) {
        return NextResponse.json({ error: `File ${file.name} exceeds 20MB limit` }, { status: 400 });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name) || '';
      const datePath = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
      const objectKey = `${dir}/${datePath}/${randomUUID()}${ext}`;

      await client.put(objectKey, buffer, {
        headers: { 'Content-Type': file.type },
      });

      const url = `${process.env.FILE_OSS_URL}${objectKey}`;
      urls.push(url);
    }

    return NextResponse.json({ count: urls.length, urls }, { status: 200 });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 });
  }
}
