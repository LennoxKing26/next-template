// app/api/theme/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies(); // 不用 await
  const currentTheme = cookieStore.get('theme')?.value || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  cookieStore.set('theme', newTheme, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/', // 建议带上
    httpOnly: false, // 你要在浏览器读，就别设 httpOnly: true
  });

  return NextResponse.json({ theme: newTheme });
}
