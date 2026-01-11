'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from '@/i18n/navigation';
import { Button, Textarea, Card, CardHeader, CardBody } from '@heroui/react';
import { useEditorController } from '@/hooks/useEditorController';
import { ImageUploader } from './ImageUploader';
import { ResultDisplay } from './ResultDisplay';
import { Header } from '@/components/common/Header'; // 复用之前的 Header

export default function EditorClient() {
  const { status } = useSession();
  const router = useRouter();

  // 使用自定义 Hook 获取逻辑
  const {
    state: { images, imagePreviews, prompt, error, resultUrl, isProcessing },
    actions: { setPrompt, handleImageChange, handleSubmit, handleReset },
    statusText,
  } = useEditorController();

  // 鉴权保护
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
  }, [status, router]);

  if (status !== 'authenticated') return null; // 防止闪烁

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            AI 图片编辑器
          </h1>
          <p className="text-default-500 text-lg">上传图片，告诉 AI 你想改什么，奇迹即刻发生</p>
        </div>

        {/* 只有当没有结果时，才显示表单 */}
        {!resultUrl ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 animate-appearance-in">
            {/* 上传区域 */}
            <div className="space-y-2">
              <label className="text-lg font-semibold px-1">1. 上传图片</label>
              <ImageUploader previews={imagePreviews} onChange={handleImageChange} disabled={isProcessing} />
            </div>

            {/* 指令区域 */}
            <div className="space-y-2">
              <label className="text-lg font-semibold px-1">2. 编辑指令</label>
              <Card className="bg-content1/50 border border-default-200">
                <CardBody className="p-4">
                  <Textarea
                    value={prompt}
                    onValueChange={setPrompt}
                    isDisabled={isProcessing}
                    minRows={4}
                    placeholder="例如：把背景换成雪山，给人物戴上一顶红色的帽子..."
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

            {/* 错误提示 */}
            {error && (
              <div className="p-4 rounded-xl bg-danger-50 text-danger flex items-center gap-2">
                <iconify-icon icon="mdi:alert-circle" width="20" />
                {error}
              </div>
            )}

            {/* 提交按钮 */}
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
          // 结果展示
          <div className="animate-appearance-in">
            <ResultDisplay resultUrl={resultUrl} onReset={handleReset} />
          </div>
        )}
      </main>
    </div>
  );
}
