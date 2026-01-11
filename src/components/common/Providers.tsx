// src/components/common/Providers.tsx
'use client';

import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
