// app/components/ThemeToggle.tsx
'use client';
import { Button } from '@heroui/react';

export function ThemeToggle() {
  const toggleTheme = async () => {
    // 调用服务端 API 切换主题
    const res = await fetch('/api/theme');
    const data = await res.json();
    const newTheme = data.theme;

    // 修改 data-theme
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <Button variant="primary" onClick={toggleTheme}>
      切换主题
    </Button>
  );
}
