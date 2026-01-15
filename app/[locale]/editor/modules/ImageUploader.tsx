'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageUploaderProps {
  previews: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export function ImageUploader({ previews, onChange, disabled }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('Editor');

  return (
    <Card className="p-6 border-2 border-dashed border-border bg-card/50">
      <div className="flex flex-col items-center justify-center gap-4">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onChange}
          disabled={disabled}
          className="hidden"
        />

        {previews.length === 0 ? (
          <div
            className="flex flex-col items-center cursor-pointer py-8 w-full hover:bg-accent/50 rounded-lg transition-colors"
            onClick={() => !disabled && inputRef.current?.click()}
          >
            <div className="p-4 rounded-full bg-primary/10 text-primary mb-3">
              <iconify-icon icon="mdi:cloud-upload" width="40"></iconify-icon>
            </div>
            <h3 className="text-lg font-semibold">{t('clickToUpload')}</h3>
            <p className="text-sm text-muted-foreground">{t('uploadHint')}</p>
          </div>
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {previews.map((src, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-border">
                  <Image src={src} alt={`Preview ${index}`} fill className="object-cover" />
                </div>
              ))}
            </div>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => !disabled && inputRef.current?.click()}
              disabled={disabled}
              className="w-full"
            >
              <iconify-icon icon="mdi:refresh" width="18" class="mr-2"></iconify-icon>
              {t('reselect')}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
