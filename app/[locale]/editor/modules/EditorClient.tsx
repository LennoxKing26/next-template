'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useEditorController } from '@/hooks/useEditorController';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ImageUploader } from './ImageUploader';
import { ResultDisplay } from './ResultDisplay';

export default function EditorClient() {
  const { status } = useSession();
  const router = useRouter();
  const t = useTranslations('Editor');

  const {
    state: { imagePreviews, prompt, error, resultUrl, isProcessing },
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
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            {t('pageTitle')}
          </h1>
          <p className="text-muted-foreground text-lg">{t('pageSubtitle')}</p>
        </div>

        {!resultUrl ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 animate-in fade-in">
            <div className="space-y-2">
              <label className="text-lg font-semibold px-1">{t('uploadLabel')}</label>
              <ImageUploader previews={imagePreviews} onChange={handleImageChange} disabled={isProcessing} />
            </div>

            <div className="space-y-2">
              <label className="text-lg font-semibold px-1">{t('promptLabel')}</label>
              <Card className="bg-card/50 border">
                <CardContent className="p-4">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isProcessing}
                    rows={4}
                    placeholder={t('promptPlaceholder')}
                    className="resize-none border-0 bg-transparent focus-visible:ring-0 text-base"
                  />
                </CardContent>
              </Card>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 text-destructive flex items-center gap-2">
                <iconify-icon icon="mdi:alert-circle" width="20"></iconify-icon>
                {error}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full font-bold text-lg h-14" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <iconify-icon icon="mdi:loading" width="24" class="animate-spin mr-2"></iconify-icon>
                  {statusText}
                </>
              ) : (
                <>
                  <iconify-icon icon="mdi:magic-staff" width="24" class="mr-2"></iconify-icon>
                  {statusText}
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="animate-in fade-in">
            <ResultDisplay resultUrl={resultUrl} onReset={handleReset} />
          </div>
        )}
      </main>
    </div>
  );
}
