// app/[locale]/layout.tsx
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import '../globals.css';
import IconInit from '@/components/common/IconInit';
import { SessionProvider } from '@/components/common/SessionProvider';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    'zh-CN': 'AI 图片编辑器 - 智能图片编辑工具',
    en: 'AI Image Editor - Smart Image Editing Tool',
    ko: 'AI 이미지 편집기 - 스마트 이미지 편집 도구',
  };

  const descriptions = {
    'zh-CN':
      '使用最先进的 AI 技术，轻松编辑图片中的任何元素。保持原图风格，精准修改内容，让图片编辑变得简单高效。支持智能图片编辑、文字修改、风格保持等功能。',
    en: 'Use cutting-edge AI technology to easily edit any element in your images. Maintain original style, precisely modify content, and make image editing simple and efficient. Supports smart image editing, text modification, style preservation, and more.',
    ko: '최첨단 AI 기술을 사용하여 이미지의 모든 요소를 쉽게 편집하세요. 원본 스타일을 유지하고 콘텐츠를 정확하게 수정하여 이미지 편집을 간단하고 효율적으로 만듭니다.',
  };

  const title = titles[locale as keyof typeof titles] || titles['zh-CN'];
  const description = descriptions[locale as keyof typeof descriptions] || descriptions['zh-CN'];

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: [
      'AI image editor',
      'image editing',
      'AI technology',
      'photo editor',
      'smart editing',
      'AI图片编辑',
      '图片编辑器',
      '智能编辑',
      'AI이미지편집',
    ],
    authors: [{ name: 'AI Image Editor Team' }],
    creator: 'AI Image Editor',
    publisher: 'AI Image Editor',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8888'),
    alternates: {
      canonical: '/',
      languages: {
        'zh-CN': '/zh-CN',
        en: '/en',
        ko: '/ko',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: '/',
      title,
      description,
      siteName: 'AI Image Editor',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
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
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  };
}

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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="bg-background-light dark:bg-background-dark transition-colors! duration-500 min-h-screen">
        <IconInit /> {/* 👈 把它放在这里，全站生效 */}
        <SessionProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
