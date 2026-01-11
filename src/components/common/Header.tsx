// src/components/home/Header.tsx
'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { LocaleSwitcher } from '@/components/common/LocaleSwitcher';
import { useSession, signOut } from 'next-auth/react';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from '@heroui/react';

export function Header() {
  const t = useTranslations('Common');
  const { data: session } = useSession();

  return (
    // 使用 HeroUI 的 Navbar 组件，自带吸顶和玻璃拟态效果
    <Navbar maxWidth="2xl" position="sticky" className="bg-background/70 backdrop-blur-md border-b border-default-100">
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-lg group-hover:scale-110 transition-transform text-primary">
            <iconify-icon icon="mdi:image-edit" width="20" height="20"></iconify-icon>
          </div>
          <span className="font-bold text-inherit text-lg">AI Editor</span>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end" className="gap-2 sm:gap-4">
        <NavbarItem>
          <LocaleSwitcher />
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>

        {session ? (
          <>
            <NavbarItem className="hidden sm:flex">
              <Button
                as={Link}
                href="/history"
                variant="ghost"
                startContent={<iconify-icon icon="mdi:history" width="18"></iconify-icon>}
              >
                {t('history')}
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name={session.user?.name?.[0]}
                    size="sm"
                    src={session.user?.image || undefined}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">{t('email')}</p>
                    <p className="font-semibold">{session.user?.email}</p>
                  </DropdownItem>
                  <DropdownItem key="history" href="/history" className="sm:hidden">
                    {t('history')}
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
                    {t('logout')}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              href="/auth/signin"
              color="primary"
              variant="flat"
              size="sm"
              startContent={<iconify-icon icon="mdi:login" width="18"></iconify-icon>}
              className="font-medium"
            >
              {t('login')}
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
