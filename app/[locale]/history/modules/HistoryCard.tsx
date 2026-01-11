'use client';

import { Card, CardFooter, Image, Button, Chip } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

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

  const statusMap: Record<string, { color: 'success' | 'warning' | 'danger' | 'default'; labelKey: string }> = {
    completed: { color: 'success', labelKey: 'statusCompleted' },
    processing: { color: 'warning', labelKey: 'statusProcessing' },
    failed: { color: 'danger', labelKey: 'statusFailed' },
    pending: { color: 'default', labelKey: 'statusPending' },
  };

  const statusConfig = statusMap[record.status] || statusMap.pending;

  const dateStr = new Date(record.createdAt).toLocaleString(locale, {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card isFooterBlurred className="w-full h-[300px]  border-none" shadow="sm">
      <div className="relative w-full h-full overflow-hidden group">
        {record.resultUrl ? (
          <Image
            removeWrapper
            alt="AI Generated Result"
            className="z-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={record.resultUrl}
          />
        ) : (
          <div className="w-full h-full bg-default-100 flex flex-col items-center justify-center text-default-400 gap-2">
            <iconify-icon
              icon={record.status === 'processing' ? 'mdi:magic-staff' : 'mdi:image-broken-variant'}
              width="48"
              class={record.status === 'processing' ? 'animate-pulse' : ''}
            />
            <span className="text-xs">{t(statusConfig.labelKey)}</span>
          </div>
        )}

        <div className="absolute top-2 right-2 z-20">
          <Chip color={statusConfig.color} size="sm" variant="flat" className="backdrop-blur-md bg-background/60">
            {t(statusConfig.labelKey)}
          </Chip>
        </div>
      </div>

      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 flex-col items-start gap-2 h-[100px] backdrop-blur-md">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-1 w-[70%]">
            <p className="text-tiny text-white/60 uppercase font-bold">{dateStr}</p>
            <p className="text-small text-white truncate font-medium" title={record.prompt}>
              {record.prompt}
            </p>
          </div>
          {record.resultUrl && (
            <Button
              isIconOnly
              radius="full"
              size="sm"
              variant="flat"
              className="text-white bg-white/20 hover:bg-white/40"
              onPress={() => window.open(record.resultUrl, '_blank')}
            >
              <iconify-icon icon="mdi:download" width="18" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
