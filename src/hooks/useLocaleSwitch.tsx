// src/hooks/useLocaleSwitch.ts
'use client';

import { useCallback, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { locales, type Locale, usePathname, useRouter } from '@/i18n/routing';

export function useLocaleSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;

  const availableLocales = useMemo(
    () =>
      locales.map((locale) => ({
        value: locale,
        label: locale === 'zh-CN' ? '中文' : 'English',
      })),
    []
  );

  const switchLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === currentLocale) return;

      // 这里用 next-intl 的 router，会自动把 locale 前缀加到 URL 前面
      router.replace(pathname, { locale: nextLocale });
    },
    [currentLocale, pathname, router]
  );

  return {
    currentLocale,
    availableLocales,
    switchLocale,
  };
}
