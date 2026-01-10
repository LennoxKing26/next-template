'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { Button } from '@heroui/react';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
        setError('邮箱或密码错误');
      } else {
        router.push('/editor');
      }
    } catch (err) {
      setError('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <iconify-icon
              icon="mdi:image-edit"
              width="40"
              height="40"
              class="text-primary-light dark:text-primary-dark"
            ></iconify-icon>
            <h1 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">AI Image Editor</h1>
          </Link>
          <h2 className="text-2xl font-semibold text-text-light-primary dark:text-text-dark-primary">登录账户</h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2">
            还没有账户？
            <Link href="/auth/signup" className="text-primary-light dark:text-primary-dark hover:underline ml-1">
              立即注册
            </Link>
          </p>
        </div>

        <div className="bg-surface dark:bg-surface-dark p-8 rounded-xl border border-border-light dark:border-border-dark">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-error-50 dark:bg-error-900/20 text-error-light dark:text-error-dark text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2"
              >
                邮箱
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2"
              >
                密码
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" variant="primary" isDisabled={loading} className="w-full">
              {loading ? '登录中...' : '登录'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
