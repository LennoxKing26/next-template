// app/[locale]/layout.tsx
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import '../globals.css';
import IconInit from '@/components/common/IconInit'; // 引入刚才写的组件

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  // ✅ Next 16 这里要声明为 Promise
  params: Promise<{ locale: string }>;
}) {
  // ✅ 先 await 再解构
  const { locale } = await params;

  // ✅ 告诉 next-intl 当前请求的语言（要在任何 next-intl 调用之前）
  setRequestLocale(locale);

  // ✅ 会根据当前 locale + src/i18n/request.ts 加载对应 messages
  const messages = await getMessages();

  const cookieStore = await cookies();
  const themeMode = cookieStore.get('theme')?.value || 'system';

  // 服务端无法检测系统主题，system 模式默认用 light，客户端会自动调整
  const serverTheme = themeMode === 'system' ? 'light' : themeMode;

  return (
    <html lang={locale} data-theme={serverTheme}>
      <body className="bg-background-light dark:bg-background-dark transition-colors! duration-500 min-h-screen">
        <IconInit /> {/* 👈 把它放在这里，全站生效 */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
