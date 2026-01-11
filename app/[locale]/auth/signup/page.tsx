// app/[locale]/auth/signup/page.tsx
import { getTranslations } from 'next-intl/server';
import SignUpForm from './modules/SignUpForm'; // 引入刚才拆出去的客户端组件

// ✅ 这里是服务端，可以写 metadata
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Auth' });

  return {
    title: t('signup_title'), // 例如 "注册账户 | AI Image Editor"
    description: t('signup_desc'),
  };
}

export default function SignUpPage() {
  // 服务端页面直接渲染客户端表单

  // 布局容器：h-screen 固定高度 + overflow-hidden 解决滚动条问题
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* 背景装饰光晕：放在服务端页面渲染，避免随表单状态重新渲染 */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 blur-[120px] rounded-full pointer-events-none" />

      {/* 引入客户端表单组件 */}
      <div className="z-10 w-full flex justify-center px-4">
        <SignUpForm />;
      </div>

      {/* 底部版权（可选） */}
      <div className="absolute bottom-4 text-[10px] text-default-300 pointer-events-none">
        © 2026 AI Image Editor. All rights reserved.
      </div>
    </div>
  );
}
