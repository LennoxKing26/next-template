// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // 支持的语言
  locales: ['en', 'zh-CN'],

  // 默认语言
  defaultLocale: 'zh-CN',

  // URL 前缀策略：
  // 'always' => 所有语言都带前缀：/en /zh-CN
  // 想默认语言不带前缀可以改成 'as-needed'
  localePrefix: 'always',
});

// 这些导出给其他地方用
export const locales = routing.locales;
export type Locale = (typeof locales)[number];
export const defaultLocale = routing.defaultLocale;
