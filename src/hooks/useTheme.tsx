// src/hooks/useTheme.ts
'use client';

import { useEffect } from 'react';
import { useThemeStore, type ThemeMode, type ResolvedTheme } from '@/stores';
import { useMount } from 'ahooks';

export function useTheme() {
  const { themeMode, resolvedTheme, setThemeMode, setResolvedTheme, cycleTheme } = useThemeStore();

  // 获取系统主题偏好
  const getSystemTheme = (): ResolvedTheme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // 解析实际应该应用的主题
  const resolveTheme = (mode: ThemeMode): ResolvedTheme => {
    if (mode === 'system') {
      return getSystemTheme();
    }
    return mode;
  };

  // 应用主题到 DOM
  const applyTheme = (theme: ResolvedTheme) => {
    document.documentElement.setAttribute('data-theme', theme);
    setResolvedTheme(theme);
  };

  // 初始化：从 cookie 读取主题模式
  useMount(() => {
    const cookieTheme = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='))
      ?.split('=')[1] as ThemeMode | undefined;

    if (cookieTheme && ['light', 'dark', 'system'].includes(cookieTheme)) {
      setThemeMode(cookieTheme);
      const resolved = resolveTheme(cookieTheme);
      applyTheme(resolved);
    } else {
      // 如果没有 cookie，使用 store 中的默认值
      const resolved = resolveTheme(themeMode);
      applyTheme(resolved);
    }
  });

  // 监听 themeMode 变化
  useEffect(() => {
    const resolved = resolveTheme(themeMode);
    applyTheme(resolved);

    // 更新 cookie
    document.cookie = `theme=${themeMode}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }, [themeMode]);

  // 监听系统主题变化（仅当 themeMode 为 system 时）
  useEffect(() => {
    if (themeMode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      applyTheme(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  return {
    themeMode,
    resolvedTheme,
    setThemeMode,
    cycleTheme,
  };
}
