'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { Button } from '@heroui/react';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
        setError(data.error || '注册失败');
        setLoading(false);
        return;
      }

      // Auto sign in after registration
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('注册成功，但登录失败，请手动登录');
        setTimeout(() => router.push('/auth/signin'), 2000);
      } else {
        router.push('/editor');
      }
    } catch (err) {
      setError('注册失败，请重试');
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
          <h2 className="text-2xl font-semibold text-text-light-primary dark:text-text-dark-primary">创建账户</h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2">
            已有账户？
            <Link href="/auth/signin" className="text-primary-light dark:text-primary-dark hover:underline ml-1">
              立即登录
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
                htmlFor="name"
                className="block text-sm font-medium text-text-light-primary dark:text-text-dark-primary mb-2"
              >
                姓名（可选）
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                placeholder="Your Name"
              />
            </div>

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
                密码（至少 6 位）
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" variant="primary" isDisabled={loading} className="w-full">
              {loading ? '注册中...' : '注册'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
