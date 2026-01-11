// app/[locale]/auth/signin/page.tsx
import { getTranslations } from 'next-intl/server';
import SignInForm from './modules/SignInForm'; // 引入拆分出来的组件

// ✅ 服务端生成 Metadata，这对 SEO 至关重要
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Auth' });

  return {
    // 假设你的翻译文件里有 login_title，例如 "登录账户 | AI Image Editor"
    title: t('login_title') || '登录账户 | AI Image Editor',
    description: t('login_desc') || '登录以继续使用 AI 图片编辑器',
  };
}

export default function SignInPage() {
  return (
    // 布局容器：h-screen 固定高度 + overflow-hidden 解决滚动条问题
    <div className="h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* 背景装饰光晕：放在服务端页面渲染，避免随表单状态重新渲染 */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 blur-[120px] rounded-full pointer-events-none" />

      {/* 引入客户端表单组件 */}
      <div className="z-10 w-full flex justify-center px-4">
        <SignInForm />
      </div>

      {/* 底部版权（可选） */}
      <div className="absolute bottom-4 text-[10px] text-default-300 pointer-events-none">
        © 2026 AI Image Editor. All rights reserved.
      </div>
    </div>
  );
}
