'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, Link } from '@/i18n/navigation';
import { Button } from '@heroui/react';

interface EditRecord {
  _id: string;
  prompt: string;
  images: string[];
  resultUrl?: string;
  status: string;
  createdAt: string;
}

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [history, setHistory] = useState<EditRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Redirect to signin if not authenticated
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchHistory();
    }
  }, [status]);

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/history');
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      const data = await response.json();
      setHistory(data.history || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="border-b border-border-light dark:border-border-dark bg-surface dark:bg-surface-dark">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <iconify-icon
              icon="mdi:image-edit"
              width="32"
              height="32"
              class="text-primary-light dark:text-primary-dark"
            ></iconify-icon>
            <h1 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">AI Image Editor</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/editor"
              className="text-text-light-primary dark:text-text-dark-primary hover:text-primary-light dark:hover:text-primary-dark"
            >
              <iconify-icon icon="mdi:image-edit" width="24" height="24"></iconify-icon>
            </Link>
            <span className="text-text-light-secondary dark:text-text-dark-secondary">{session?.user?.email}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-text-light-primary dark:text-text-dark-primary">编辑历史</h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mb-8">查看你的所有图片编辑记录</p>

          {loading && (
            <div className="text-center py-12">
              <iconify-icon
                icon="mdi:loading"
                width="48"
                height="48"
                class="animate-spin text-primary-light dark:text-primary-dark"
              ></iconify-icon>
              <p className="mt-4 text-text-light-secondary dark:text-text-dark-secondary">加载中...</p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-lg bg-error-50 dark:bg-error-900/20 text-error-light dark:text-error-dark mb-6">
              {error}
            </div>
          )}

          {!loading && !error && history.length === 0 && (
            <div className="text-center py-12 bg-surface dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark">
              <iconify-icon
                icon="mdi:image-off"
                width="64"
                height="64"
                class="text-text-light-secondary dark:text-text-dark-secondary mx-auto mb-4"
              ></iconify-icon>
              <p className="text-text-light-secondary dark:text-text-dark-secondary mb-4">还没有编辑记录</p>
              <Link href="/editor">
                <Button variant="primary">开始编辑</Button>
              </Link>
            </div>
          )}

          {!loading && !error && history.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((record) => (
                <div
                  key={record._id}
                  className="bg-surface dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden hover:border-primary-light dark:hover:border-primary-dark transition-colors"
                >
                  {/* Image Preview */}
                  {record.resultUrl ? (
                    <img src={record.resultUrl} alt="Result" className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <iconify-icon
                        icon={record.status === 'processing' ? 'mdi:loading' : 'mdi:image-off'}
                        width="48"
                        height="48"
                        class={`text-gray-400 ${record.status === 'processing' ? 'animate-spin' : ''}`}
                      ></iconify-icon>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-2">
                      {new Date(record.createdAt).toLocaleString('zh-CN')}
                    </p>
                    <p className="text-text-light-primary dark:text-text-dark-primary mb-3 line-clamp-2">
                      {record.prompt}
                    </p>

                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          record.status === 'completed'
                            ? 'bg-success-50 dark:bg-success-900/20 text-success-light dark:text-success-dark'
                            : record.status === 'processing'
                            ? 'bg-warning-50 dark:bg-warning-900/20 text-warning-light dark:text-warning-dark'
                            : record.status === 'failed'
                            ? 'bg-error-50 dark:bg-error-900/20 text-error-light dark:text-error-dark'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {record.status === 'completed'
                          ? '已完成'
                          : record.status === 'processing'
                          ? '处理中'
                          : record.status === 'failed'
                          ? '失败'
                          : record.status}
                      </span>

                      {record.resultUrl && (
                        <a
                          href={record.resultUrl}
                          download
                          className="text-primary-light dark:text-primary-dark hover:underline text-sm"
                        >
                          下载
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
