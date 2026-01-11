'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from '@/i18n/navigation';
import { Button, Textarea, Card, CardBody } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useEditorController } from '@/hooks/useEditorController';
import { ImageUploader } from './ImageUploader';
import { ResultDisplay } from './ResultDisplay';

export default function EditorClient() {
  const { status } = useSession();
  const router = useRouter();
  const t = useTranslations('Editor');

  const {
    state: { images, imagePreviews, prompt, error, resultUrl, isProcessing },
    actions: { setPrompt, handleImageChange, handleSubmit, handleReset },
    statusKey,
  } = useEditorController();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
  }, [status, router]);

  if (status !== 'authenticated') return null;

  const statusText = t(statusKey);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {t('pageTitle')}
          </h1>
          <p className="text-default-500 text-lg">{t('pageSubtitle')}</p>
        </div>

        {!resultUrl ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 animate-appearance-in">
            <div className="space-y-2">
              <label className="text-lg font-semibold px-1">{t('uploadLabel')}</label>
              <ImageUploader previews={imagePreviews} onChange={handleImageChange} disabled={isProcessing} />
            </div>

            <div className="space-y-2">
              <label className="text-lg font-semibold px-1">{t('promptLabel')}</label>
              <Card className="bg-content1/50 border border-default-200">
                <CardBody className="p-4">
                  <Textarea
                    value={prompt}
                    onValueChange={setPrompt}
                    isDisabled={isProcessing}
                    minRows={4}
                    placeholder={t('promptPlaceholder')}
                    variant="flat"
                    size="lg"
                    classNames={{
                      input: 'text-base',
                      inputWrapper: 'bg-transparent shadow-none',
                    }}
                  />
                </CardBody>
              </Card>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-danger-50 text-danger flex items-center gap-2">
                <iconify-icon icon="mdi:alert-circle" width="20" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              color="primary"
              size="lg"
              isLoading={isProcessing}
              className="w-full font-bold text-lg shadow-xl shadow-primary/20 h-14"
              startContent={!isProcessing && <iconify-icon icon="mdi:magic-staff" width="24" />}
            >
              {statusText}
            </Button>
          </form>
        ) : (
          <div className="animate-appearance-in">
            <ResultDisplay resultUrl={resultUrl} onReset={handleReset} />
          </div>
        )}
      </main>
    </div>
  );
}
