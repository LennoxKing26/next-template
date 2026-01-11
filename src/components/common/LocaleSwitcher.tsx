// src/components/LocaleSwitcher.tsx
'use client';

import { useLocaleSwitch } from '@/hooks/useLocaleSwitch';
import { useTranslations } from 'next-intl';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import type { Key } from 'react';

export function LocaleSwitcher() {
  const { currentLocale, switchLocale } = useLocaleSwitch();
  const t = useTranslations('Common');

  // 处理下拉菜单点击事件
  const handleAction = (key: Key) => {
    switchLocale(key as 'zh-CN' | 'en' | 'ko');
  };

  return (
    <Dropdown placement="bottom-end">
      {/* 触发器按钮 */}
      <DropdownTrigger>
        <Button variant="ghost" isIconOnly aria-label={t('switch_language')} className="w-8 h-8 sm:w-9 sm:h-9 text-lg">
          {/* 主按钮图标：使用翻译图标代替固定国旗，更通用 */}
          <iconify-icon
            icon="mdi:translate"
            width="22"
            height="22"
            class="text-default-500 group-hover:text-primary transition-colors"
          ></iconify-icon>
        </Button>
      </DropdownTrigger>

      {/* 下拉菜单内容 */}
      <DropdownMenu
        aria-label="Language selection"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([currentLocale])}
        onAction={handleAction}
        className="min-w-[140px]"
      >
        <DropdownItem
          key="zh-CN"
          startContent={<iconify-icon icon="circle-flags:cn" width="20" height="20"></iconify-icon>}
        >
          {t('switch_zh')}
        </DropdownItem>

        <DropdownItem
          key="en"
          startContent={<iconify-icon icon="circle-flags:us" width="20" height="20"></iconify-icon>}
        >
          {t('switch_en')}
        </DropdownItem>

        <DropdownItem
          key="ko"
          startContent={<iconify-icon icon="circle-flags:kr" width="20" height="20"></iconify-icon>}
        >
          {t('switch_ko')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
