import { getTranslations } from 'next-intl/server';
import HistoryList from './modules/HistoryList';
import { Header } from '@/components/common/Header'; // 复用你的 Header 组件

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'History' });
  return {
    title: t('title') || '我的创作历史 | AI Image Editor',
    description: '查看和管理您的 AI 图片编辑历史记录',
  };
}

export default async function HistoryPage() {
  return (
    <div className="min-h-screen  bg-background">
      <main className="container max-w-7xl mx-auto px-6 pt-10">
        {/* 页面标题区 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">创作历史</h1>
            <p className="text-default-500 mt-2">回顾您所有的 AI 创意时刻</p>
          </div>

          {/* 这里可以放一些筛选器，暂时留空 */}
        </div>

        {/* 核心列表组件 */}
        <HistoryList />
      </main>
    </div>
  );
}
