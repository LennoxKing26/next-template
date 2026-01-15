'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ResultDisplayProps {
  resultUrl: string;
  onReset: () => void;
}

export function ResultDisplay({ resultUrl, onReset }: ResultDisplayProps) {
  const t = useTranslations('Editor');

  return (
    <Card className="mt-8 bg-card border overflow-visible shadow-lg">
      <CardContent className="p-6 gap-6 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <iconify-icon icon="mdi:check-decagram" width="28" class="text-green-500"></iconify-icon>
          <h3 className="text-2xl font-bold">{t('editComplete')}</h3>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-border shadow-sm bg-muted/20">
          <Image
            src={resultUrl}
            alt="Edited result"
            width={800}
            height={600}
            className="w-full h-auto object-contain max-h-[600px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button asChild size="lg" className="flex-1 font-semibold">
            <a href={resultUrl} download="edited-image.png">
              <iconify-icon icon="mdi:download" width="24" class="mr-2"></iconify-icon>
              {t('downloadImage')}
            </a>
          </Button>
          <Button variant="outline" size="lg" className="flex-1 font-semibold" onClick={onReset}>
            <iconify-icon icon="mdi:refresh" width="24" class="mr-2"></iconify-icon>
            {t('editAgain')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
