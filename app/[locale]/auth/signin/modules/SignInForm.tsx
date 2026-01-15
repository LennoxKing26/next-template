'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function SignInForm() {
  const router = useRouter();
  const t = useTranslations('Auth');
  const tCommon = useTranslations('Common');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(t('errorCredentials'));
      } else {
        router.push('/editor');
      }
    } catch {
      setError(t('errorLoginFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md backdrop-blur-md bg-background/60 dark:bg-card/50 shadow-xl border">
      <CardHeader className="flex flex-col gap-3 items-center pt-8 pb-4">
        <Link href="/" className="group flex flex-col items-center gap-2">
          <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
            <iconify-icon icon="mdi:image-edit" width="32" height="32"></iconify-icon>
          </div>
          <h1 className="text-2xl font-bold">AI Image Editor</h1>
        </Link>
        <div className="text-center space-y-1">
          <h2 className="text-xl font-semibold">{t('welcomeBack')}</h2>
          <p className="text-sm text-muted-foreground">{t('enterCredentials')}</p>
        </div>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2 animate-in fade-in">
              <iconify-icon icon="mdi:alert-circle" width="18"></iconify-icon>
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('email')}</label>
              <div className="relative">
                <iconify-icon
                  icon="mdi:email"
                  width="18"
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                ></iconify-icon>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('password')}</label>
              <div className="relative">
                <iconify-icon
                  icon="mdi:lock"
                  width="18"
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                ></iconify-icon>
                <Input
                  type={isVisible ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="toggle password visibility"
                >
                  <iconify-icon icon={isVisible ? 'mdi:eye-off' : 'mdi:eye'} width="18"></iconify-icon>
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="#" className="text-xs text-primary hover:underline">
                {t('forgotPassword')}
              </Link>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full font-semibold" disabled={loading}>
            {loading ? (
              <>
                <iconify-icon icon="mdi:loading" width="20" class="animate-spin mr-2"></iconify-icon>
                {t('loggingIn')}
              </>
            ) : (
              <>
                <iconify-icon icon="mdi:login" width="20" class="mr-2"></iconify-icon>
                {tCommon('login')}
              </>
            )}
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center mt-2">
            <span>{t('noAccount')}</span>
            <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
              {t('registerNow')}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
