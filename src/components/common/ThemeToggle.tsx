'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { useIsMounted } from '@/hooks/useIsMounted';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useIsMounted();
  const t = useTranslations('Common');

  const getTriggerIcon = () => {
    if (!mounted) return null;
    switch (theme) {
      case 'system':
        return <iconify-icon icon="mdi:monitor" width="20" height="20"></iconify-icon>;
      case 'dark':
        return <iconify-icon icon="mdi:weather-night" width="20" height="20"></iconify-icon>;
      case 'light':
        return <iconify-icon icon="mdi:weather-sunny" width="20" height="20"></iconify-icon>;
      default:
        return resolvedTheme === 'dark' ? (
          <iconify-icon icon="mdi:weather-night" width="20" height="20"></iconify-icon>
        ) : (
          <iconify-icon icon="mdi:weather-sunny" width="20" height="20"></iconify-icon>
        );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9" aria-label={t('switch_theme') || 'Toggle theme'}>
          {!mounted ? (
            <iconify-icon icon="mdi:weather-sunny" width="20" height="20" class="opacity-0"></iconify-icon>
          ) : (
            getTriggerIcon()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer gap-2">
          <iconify-icon icon="mdi:weather-sunny" width="18" height="18"></iconify-icon>
          {t('theme_light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer gap-2">
          <iconify-icon icon="mdi:weather-night" width="18" height="18"></iconify-icon>
          {t('theme_dark')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer gap-2">
          <iconify-icon icon="mdi:monitor" width="18" height="18"></iconify-icon>
          {t('theme_system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
