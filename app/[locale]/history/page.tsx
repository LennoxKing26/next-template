import { getTranslations } from 'next-intl/server';
import HistoryList from './modules/HistoryList';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'History' });
  return {
    title: t('title'),
    description: t('pageSubtitle'),
  };
}

export default async function HistoryPage() {
  const t = await getTranslations('History');

  return (
    <div className="min-h-screen  bg-background">
      <main className="container max-w-7xl mx-auto px-6 pt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('pageTitle')}</h1>
            <p className="text-default-500 mt-2">{t('pageSubtitle')}</p>
          </div>
        </div>

        <HistoryList />
      </main>
    </div>
  );
}
