// src/components/common/ThemeToggle.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useTranslations } from 'next-intl';

export function ThemeToggle() {
  const { themeMode, setThemeMode } = useTheme();
  const t = useTranslations('Common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getThemeIcon = () => {
    if (themeMode === 'system') return '🖥️';
    if (themeMode === 'dark') return '🌙';
    return '☀️';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setThemeMode(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-lg"
        aria-label="Toggle theme"
      >
        {getThemeIcon()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50">
          <button
            onClick={() => handleThemeChange('light')}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
              themeMode === 'light'
                ? 'text-primary-light dark:text-primary-dark font-semibold'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            ☀️ {t('theme_light')}
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
              themeMode === 'dark'
                ? 'text-primary-light dark:text-primary-dark font-semibold'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            🌙 {t('theme_dark')}
          </button>
          <button
            onClick={() => handleThemeChange('system')}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
              themeMode === 'system'
                ? 'text-primary-light dark:text-primary-dark font-semibold'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            🖥️ {t('theme_system')}
          </button>
        </div>
      )}
    </div>
  );
}
