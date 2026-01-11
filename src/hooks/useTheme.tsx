// src/hooks/useTheme.ts
'use client';

import { useEffect } from 'react';
import { useThemeStore, type ThemeMode, type ResolvedTheme } from '@/stores';
import { useMount } from 'ahooks';

export function useTheme() {
  const { themeMode, resolvedTheme, setThemeMode, setResolvedTheme, cycleTheme } = useThemeStore();

  const getSystemTheme = (): ResolvedTheme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const resolveTheme = (mode: ThemeMode): ResolvedTheme => {
    if (mode === 'system') return getSystemTheme();
    return mode;
  };

  // 🔥🔥🔥 核心修复在这里 🔥🔥🔥
  const applyTheme = (theme: ResolvedTheme) => {
    const root = document.documentElement;

    // 1. 设置 data 属性 (保留它，为了兼容你可能写的 [data-theme="dark"] 选择器)
    root.setAttribute('data-theme', theme);

    // 2. 关键：同时操作 classList，这是 HeroUI 识别暗黑模式的唯一途径
    root.classList.remove('light', 'dark');
    root.classList.add(theme); // 添加 'dark' 或 'light'

    // 3. (可选) 设置 style 属性，防止某些原生控件颜色不对
    root.style.colorScheme = theme;

    setResolvedTheme(theme);
  };

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
      const resolved = resolveTheme(themeMode);
      applyTheme(resolved);
    }
  });

  useEffect(() => {
    const resolved = resolveTheme(themeMode);
    applyTheme(resolved);
    document.cookie = `theme=${themeMode}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }, [themeMode]);

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

  return { themeMode, resolvedTheme, setThemeMode, cycleTheme };
}
