'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, Link } from '@/i18n/navigation';
import { Button, Input, Card, CardBody, CardHeader, Link as HeroLink } from '@heroui/react';
import { useTranslations } from 'next-intl';

export default function SignUpPage() {
  const router = useRouter();
  const t = useTranslations('Auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t('errorRegisterFailed'));
        setLoading(false);
        return;
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(t('errorAutoLoginFailed'));
        setTimeout(() => router.push('/auth/signin'), 2000);
      } else {
        router.push('/editor');
      }
    } catch (err) {
      setError(t('errorNetwork'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      <Card className="w-full max-w-md backdrop-blur-md bg-background/60 dark:bg-content1/50 shadow-large">
        <CardHeader className="flex flex-col gap-3 items-center pt-8 pb-4">
          <Link href="/" className="group flex flex-col items-center gap-2">
            <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
              <iconify-icon icon="mdi:image-edit" width="32" height="32"></iconify-icon>
            </div>
            <h1 className="text-2xl font-bold">AI Image Editor</h1>
          </Link>
          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold">{t('createAccount')}</h2>
            <p className="text-sm text-default-500">{t('joinUs')}</p>
          </div>
        </CardHeader>

        <CardBody className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {error && (
              <div className="p-3 rounded-medium bg-danger-50 text-danger text-sm flex items-center gap-2 animate-appearance-in">
                <iconify-icon icon="mdi:alert-circle" width="18"></iconify-icon>
                {error}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Input
                type="text"
                label={t('nickname')}
                placeholder={t('nicknamePlaceholder')}
                variant="bordered"
                labelPlacement="outside"
                value={name}
                onValueChange={setName}
                classNames={{
                  inputWrapper: 'bg-default-100/50 hover:bg-default-100 focus-within:!bg-default-100/50',
                }}
                startContent={
                  <iconify-icon icon="mdi:account-outline" class="text-default-400 text-xl pointer-events-none" />
                }
              />

              <Input
                type="email"
                label={t('email')}
                placeholder="name@example.com"
                variant="bordered"
                labelPlacement="outside"
                value={email}
                onValueChange={setEmail}
                isRequired
                classNames={{
                  inputWrapper: 'bg-default-100/50 hover:bg-default-100 focus-within:!bg-default-100/50',
                }}
                startContent={
                  <iconify-icon icon="mdi:email-outline" class="text-default-400 text-xl pointer-events-none" />
                }
              />

              <Input
                label={t('password')}
                placeholder={t('passwordPlaceholder')}
                variant="bordered"
                labelPlacement="outside"
                value={password}
                onValueChange={setPassword}
                isRequired
                minLength={6}
                startContent={
                  <iconify-icon icon="mdi:lock-outline" class="text-default-400 text-xl pointer-events-none" />
                }
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <iconify-icon icon="mdi:eye-off" class="text-default-400 text-xl" />
                    ) : (
                      <iconify-icon icon="mdi:eye" class="text-default-400 text-xl" />
                    )}
                  </button>
                }
                type={isVisible ? 'text' : 'password'}
                classNames={{
                  inputWrapper: 'bg-default-100/50 hover:bg-default-100 focus-within:!bg-default-100/50',
                }}
              />
            </div>

            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full font-semibold shadow-lg shadow-primary/20"
              isLoading={loading}
              startContent={!loading && <iconify-icon icon="mdi:account-plus" width="20" />}
            >
              {loading ? t('registering') : t('register')}
            </Button>

            <div className="flex items-center gap-2 text-sm text-default-500 justify-center mt-2">
              <span>{t('hasAccount')}</span>
              <HeroLink
                as={Link}
                href="/auth/signin"
                size="sm"
                color="primary"
                className="font-semibold cursor-pointer"
              >
                {t('loginNow')}
              </HeroLink>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
