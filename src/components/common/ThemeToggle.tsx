// src/components/common/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import { useIsMounted } from '@/hooks/useIsMounted';
import type { Key } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useIsMounted();
  const t = useTranslations('Common');

  const handleAction = (key: Key) => {
    setTheme(key as string);
  };

  // 渲染触发按钮的图标
  // 逻辑：如果没挂载，显示占位；否则显示当前设置对应的图标
  const getTriggerIcon = () => {
    if (!mounted) return null;

    // 这里使用 switch case 更清晰，图标选用 Material Design 风格，与之前的翻译图标统一
    switch (theme) {
      case 'system':
        return <iconify-icon icon="mdi:monitor" width="22" height="22" class="text-default-500"></iconify-icon>;
      case 'dark':
        return <iconify-icon icon="mdi:weather-night" width="22" height="22" class="text-default-500"></iconify-icon>;
      case 'light':
        return <iconify-icon icon="mdi:weather-sunny" width="22" height="22" class="text-default-500"></iconify-icon>;
      default:
        // 兜底：根据解析出的主题显示
        return resolvedTheme === 'dark' ? (
          <iconify-icon icon="mdi:weather-night" width="22" height="22" class="text-default-500"></iconify-icon>
        ) : (
          <iconify-icon icon="mdi:weather-sunny" width="22" height="22" class="text-default-500"></iconify-icon>
        );
    }
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          variant="ghost"
          isIconOnly
          aria-label={t('switch_theme') || 'Toggle theme'} // 建议在 json 里加上 switch_theme
          className="w-8 h-8 sm:w-9 sm:h-9 text-lg"
        >
          {/* 如果还没挂载，显示一个透明的占位符防止布局跳动 */}
          {!mounted ? (
            <iconify-icon icon="mdi:weather-sunny" width="22" height="22" class="opacity-0"></iconify-icon>
          ) : (
            getTriggerIcon()
          )}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Theme selection"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([theme || 'system'])} // 确保有默认值
        onAction={handleAction}
        className="min-w-[140px]"
      >
        <DropdownItem
          key="light"
          startContent={<iconify-icon icon="mdi:weather-sunny" width="20" height="20"></iconify-icon>}
        >
          {t('theme_light')}
        </DropdownItem>

        <DropdownItem
          key="dark"
          startContent={<iconify-icon icon="mdi:weather-night" width="20" height="20"></iconify-icon>}
        >
          {t('theme_dark')}
        </DropdownItem>

        <DropdownItem
          key="system"
          startContent={<iconify-icon icon="mdi:monitor" width="20" height="20"></iconify-icon>}
        >
          {t('theme_system')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
