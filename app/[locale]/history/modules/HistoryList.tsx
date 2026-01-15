'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, Link } from '@/i18n/navigation';
import { useRequest } from 'ahooks';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { HistoryCard } from './HistoryCard';

interface EditRecord {
  _id: string;
  prompt: string;
  images: string[];
  resultUrl?: string;
  status: string;
  createdAt: string;
}

const fetchHistoryService = async (): Promise<EditRecord[]> => {
  const response = await fetch('/api/history');
  if (!response.ok) throw new Error('Failed to fetch records');
  const data = await response.json();
  return (data.history || []).reverse();
};

export default function HistoryList() {
  const { status } = useSession();
  const router = useRouter();
  const t = useTranslations('History');

  const {
    data: history = [],
    loading,
    error,
    refresh,
  } = useRequest(fetchHistoryService, {
    ready: status === 'authenticated',
    refreshDeps: [status],
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (loading || status === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="rounded-xl h-[300px]" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 text-destructive">
        <iconify-icon icon="mdi:alert-circle-outline" width="64"></iconify-icon>
        <p className="mt-4 text-lg font-medium">
          {t('loadFailed')}: {error.message}
        </p>
        <Button variant="outline" className="mt-4" onClick={refresh}>
          {t('retry')}
        </Button>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-card/30 rounded-3xl border border-dashed border-border">
        <div className="p-6 bg-muted rounded-full mb-6">
          <iconify-icon icon="mdi:image-filter-vintage" width="64" class="text-muted-foreground"></iconify-icon>
        </div>
        <h3 className="text-xl font-bold text-foreground">{t('noRecords')}</h3>
        <p className="text-muted-foreground mt-2 mb-8 max-w-xs text-center">{t('noRecordsDesc')}</p>
        <Button asChild size="lg">
          <Link href="/editor">
            <iconify-icon icon="mdi:plus" width="24" class="mr-2"></iconify-icon>
            {t('startFirst')}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
      {history.map((record) => (
        <HistoryCard key={record._id} record={record} />
      ))}
    </div>
  );
}
