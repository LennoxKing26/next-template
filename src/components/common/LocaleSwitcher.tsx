'use client';

import { useLocaleSwitch } from '@/hooks/useLocaleSwitch';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LocaleSwitcher() {
  const { currentLocale, switchLocale } = useLocaleSwitch();
  const t = useTranslations('Common');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9" aria-label={t('switch_language')}>
          <iconify-icon icon="mdi:translate" width="20" height="20"></iconify-icon>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => switchLocale('zh-CN')}
          className="cursor-pointer gap-2"
          data-selected={currentLocale === 'zh-CN'}
        >
          <iconify-icon icon="circle-flags:cn" width="18" height="18"></iconify-icon>
          {t('switch_zh')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLocale('en')}
          className="cursor-pointer gap-2"
          data-selected={currentLocale === 'en'}
        >
          <iconify-icon icon="circle-flags:us" width="18" height="18"></iconify-icon>
          {t('switch_en')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLocale('ko')}
          className="cursor-pointer gap-2"
          data-selected={currentLocale === 'ko'}
        >
          <iconify-icon icon="circle-flags:kr" width="18" height="18"></iconify-icon>
          {t('switch_ko')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
