'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { LocaleSwitcher } from '@/components/common/LocaleSwitcher';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const t = useTranslations('Common');
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-lg group-hover:scale-110 transition-transform text-primary">
            <iconify-icon icon="mdi:image-edit" width="20" height="20"></iconify-icon>
          </div>
          <span className="font-bold text-lg">AI Editor</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <LocaleSwitcher />
          <ThemeToggle />

          {session ? (
            <>
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/history">
                  <iconify-icon icon="mdi:history" width="18" className="mr-2"></iconify-icon>
                  {t('history')}
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 border-2 border-primary">
                      <AvatarImage src={session.user?.image || undefined} alt={session.user?.name || ''} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {session.user?.name?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{t('email')}</p>
                      <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="sm:hidden cursor-pointer">
                    <Link href="/history">{t('history')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={() => signOut()}
                  >
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/auth/signin">
                <iconify-icon icon="mdi:login" width="18" className="mr-2"></iconify-icon>
                {t('login')}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
