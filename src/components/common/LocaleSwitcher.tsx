// src/components/LocaleSwitcher.tsx
'use client';

import { useLocaleSwitch } from '@/hooks/useLocaleSwitch';

export function LocaleSwitcher() {
  const { currentLocale, switchLocale } = useLocaleSwitch();

  const isZh = currentLocale === 'zh-CN';
  const isEn = currentLocale === 'en';

  return (
    <div className="inline-flex items-center rounded-full border px-1 py-0.5 gap-1 text-sm">
      <button
        type="button"
        onClick={() => switchLocale('zh-CN')}
        className={
          'px-2 py-1 rounded-full transition-colors ' +
          (isZh
            ? 'bg-black text-white dark:bg-white dark:text-black'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800')
        }
      >
        中文
      </button>
      <button
        type="button"
        onClick={() => switchLocale('en')}
        className={
          'px-2 py-1 rounded-full transition-colors ' +
          (isEn
            ? 'bg-black text-white dark:bg-white dark:text-black'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800')
        }
      >
        EN
      </button>
    </div>
  );
}
