'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Card, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface HistoryCardProps {
  record: {
    _id: string;
    prompt: string;
    images: string[];
    resultUrl?: string;
    status: string;
    createdAt: string;
  };
}

export function HistoryCard({ record }: HistoryCardProps) {
  const t = useTranslations('History');
  const locale = useLocale();

  const statusMap: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; labelKey: string }> =
    {
      completed: { variant: 'default', labelKey: 'statusCompleted' },
      processing: { variant: 'secondary', labelKey: 'statusProcessing' },
      failed: { variant: 'destructive', labelKey: 'statusFailed' },
      pending: { variant: 'outline', labelKey: 'statusPending' },
    };

  const statusConfig = statusMap[record.status] || statusMap.pending;

  const dateStr = new Date(record.createdAt).toLocaleString(locale, {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card className="w-full h-[300px] overflow-hidden border shadow-sm cursor-pointer group">
      <div className="relative w-full h-full">
        {record.resultUrl ? (
          <Image
            src={record.resultUrl}
            alt="AI Generated Result"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-muted flex flex-col items-center justify-center text-muted-foreground gap-2">
            <iconify-icon
              icon={record.status === 'processing' ? 'mdi:magic-staff' : 'mdi:image-broken-variant'}
              width="48"
              class={record.status === 'processing' ? 'animate-pulse' : ''}
            ></iconify-icon>
            <span className="text-xs">{t(statusConfig.labelKey)}</span>
          </div>
        )}

        <div className="absolute top-2 right-2 z-20">
          <Badge variant={statusConfig.variant} className="backdrop-blur-md bg-background/60">
            {t(statusConfig.labelKey)}
          </Badge>
        </div>

        <CardFooter className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md border-t border-white/10 flex-col items-start gap-2 h-[100px] p-4">
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-1 w-[70%]">
              <p className="text-xs text-white/60 uppercase font-bold">{dateStr}</p>
              <p className="text-sm text-white truncate font-medium" title={record.prompt}>
                {record.prompt}
              </p>
            </div>
            {record.resultUrl && (
              <Button
                size="icon"
                variant="ghost"
                className="text-white bg-white/20 hover:bg-white/40 rounded-full h-8 w-8"
                onClick={() => window.open(record.resultUrl, '_blank')}
              >
                <iconify-icon icon="mdi:download" width="18"></iconify-icon>
              </Button>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
