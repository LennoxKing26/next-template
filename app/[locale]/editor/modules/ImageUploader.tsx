'use client';

import { useRef } from 'react';
import { Card, Button, Image } from '@heroui/react';
import { useTranslations } from 'next-intl';

interface ImageUploaderProps {
  previews: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export function ImageUploader({ previews, onChange, disabled }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('Editor');

  return (
    <Card className="p-6 border-2 border-dashed border-default-200 bg-content1/50">
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
            className="flex flex-col items-center cursor-pointer py-8 w-full"
            onClick={() => !disabled && inputRef.current?.click()}
          >
            <div className="p-4 rounded-full bg-primary/10 text-primary mb-3">
              <iconify-icon icon="mdi:cloud-upload" width="40" />
            </div>
            <h3 className="text-lg font-semibold">{t('clickToUpload')}</h3>
            <p className="text-small text-default-500">{t('uploadHint')}</p>
          </div>
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden border border-default-200"
                >
                  <Image
                    src={src}
                    alt={`Preview ${index}`}
                    classNames={{ wrapper: 'w-full h-full', img: 'w-full h-full object-cover' }}
                  />
                </div>
              ))}
            </div>
            <Button
              size="sm"
              color="danger"
              variant="flat"
              onPress={() => !disabled && inputRef.current?.click()}
              isDisabled={disabled}
              className="w-full"
              startContent={<iconify-icon icon="mdi:refresh" />}
            >
              {t('reselect')}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
