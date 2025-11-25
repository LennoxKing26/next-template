// app/api/theme/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const currentTheme = cookieStore.get('theme')?.value || 'light'; // 默认主题 'light'
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'; // 切换主题

  // 设置新的主题
  cookieStore.set('theme', newTheme, { maxAge: 60 * 60 * 24 * 365 }); // 设置有效期1年

  // 返回切换后的主题
  return NextResponse.json({ theme: newTheme });
}
