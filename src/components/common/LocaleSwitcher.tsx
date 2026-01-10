// src/components/LocaleSwitcher.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocaleSwitch } from '@/hooks/useLocaleSwitch';
import { useTranslations } from 'next-intl';

export function LocaleSwitcher() {
  const { currentLocale, switchLocale } = useLocaleSwitch();
  const t = useTranslations('Common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const localeConfig = {
    'zh-CN': { icon: '🇨🇳', label: t('switch_zh') },
    en: { icon: '🇺🇸', label: t('switch_en') },
    ko: { icon: '🇰🇷', label: t('switch_ko') },
  };

  const currentConfig = localeConfig[currentLocale as keyof typeof localeConfig];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (locale: 'zh-CN' | 'en' | 'ko') => {
    switchLocale(locale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-lg"
        aria-label="Switch language"
      >
        {currentConfig?.icon || '🌐'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50">
          <button
            onClick={() => handleLocaleChange('zh-CN')}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
              currentLocale === 'zh-CN'
                ? 'text-primary-light dark:text-primary-dark font-semibold'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            🇨🇳 {t('switch_zh')}
          </button>
          <button
            onClick={() => handleLocaleChange('en')}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
              currentLocale === 'en'
                ? 'text-primary-light dark:text-primary-dark font-semibold'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            🇺🇸 {t('switch_en')}
          </button>
          <button
            onClick={() => handleLocaleChange('ko')}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
              currentLocale === 'ko'
                ? 'text-primary-light dark:text-primary-dark font-semibold'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            🇰🇷 {t('switch_ko')}
          </button>
        </div>
      )}
    </div>
  );
}
