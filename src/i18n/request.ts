// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale: Promise<string | undefined>
  let locale = await requestLocale;

  // 如果没有拿到，或者不在我们支持的列表里，就用默认语言
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    // ✅ 现在要显式返回 locale
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
