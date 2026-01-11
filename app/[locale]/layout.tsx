// app/[locale]/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import '../globals.css';
import IconInit from '@/components/common/IconInit';
import { SessionProvider } from '@/components/common/SessionProvider';
// 👇 引入刚才配置好的 Providers
import { Providers } from '@/components/common/Providers';
import { Header } from '@/components/common/Header';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    'zh-CN': 'AI 图片编辑器 - 智能图片编辑工具',
    en: 'AI Image Editor - Smart Image Editing Tool',
    ko: 'AI 이미지 편집기 - 스마트 이미지 편집 도구',
  };
  const descriptions = {
    'zh-CN': '使用最先进的 AI 技术，轻松编辑图片中的任何元素...',
    en: 'Use cutting-edge AI technology to easily edit any element...',
    ko: '최첨단 AI 기술을 사용하여 이미지의 모든 요소를 쉽게 편집하세요...',
  };

  const title = titles[locale as keyof typeof titles] || titles['zh-CN'];
  const description = descriptions[locale as keyof typeof descriptions] || descriptions['zh-CN'];

  return {
    title: { default: title, template: `%s | ${title}` },
    description,
    keywords: ['AI image editor', 'image editing', 'AI technology', 'photo editor', 'smart editing'],
    authors: [{ name: 'AI Image Editor Team' }],
    creator: 'AI Image Editor',
    publisher: 'AI Image Editor',
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8888'),
    alternates: { canonical: '/', languages: { 'zh-CN': '/zh-CN', en: '/en', ko: '/ko' } },
    openGraph: {
      type: 'website',
      locale: locale,
      url: '/',
      title,
      description,
      siteName: 'AI Image Editor',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
      creator: '@aiImageEditor',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: { icon: '/favicon.ico', shortcut: '/favicon.ico', apple: '/apple-touch-icon.png' },
    manifest: '/site.webmanifest',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  // ❌ 已删除：cookies() 读取逻辑
  // ❌ 已删除：themeMode, serverTheme 计算逻辑
  // ✅ next-themes 会在客户端接管并自动注入 class="dark"

  return (
    // 🔥 必须添加 suppressHydrationWarning
    // 因为服务端返回的 html 没有 class="dark"，但客户端脚本会立即加上
    // 这个属性能消除 React 的警告
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="bg-background-light dark:bg-background-dark transition-colors duration-500 min-h-screen">
        <IconInit />
        <SessionProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {/* 👇 所有的主题魔法都在这里发生 */}
            <Providers>
              {/* Header (客户端组件，但服务端也会渲染出它的 HTML) */}
              <Header />
              {children}
            </Providers>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
