// src/components/common/ThemeToggle.tsx
'use client';

import { Button } from '@heroui/react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { themeMode, resolvedTheme, cycleTheme } = useTheme();

  const getThemeLabel = () => {
    if (themeMode === 'system') {
      return `跟随系统 (${resolvedTheme === 'dark' ? '暗色' : '亮色'})`;
    }
    return themeMode === 'dark' ? '暗色' : '亮色';
  };

  const getThemeIcon = () => {
    if (themeMode === 'system') return '🖥️';
    if (themeMode === 'dark') return '🌙';
    return '☀️';
  };

  return (
    <Button variant="primary" onClick={cycleTheme}>
      {getThemeIcon()} {getThemeLabel()}
    </Button>
  );
}
