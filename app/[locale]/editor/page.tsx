import { getTranslations } from 'next-intl/server';
import EditorClient from './modules/EditorClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Editor' });
  return {
    title: t('title') || '在线编辑 | AI Image Editor',
    description: '使用 AI 智能编辑您的图片',
  };
}

export default function EditorPage() {
  return <EditorClient />;
}
