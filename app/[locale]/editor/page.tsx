'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { Button } from '@heroui/react';
import { useRequest, useInterval } from 'ahooks';

export default function EditorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Redirect to signin if not authenticated
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  // Upload images to OSS
  const { loading: uploading, runAsync: uploadImages } = useRequest(
    async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      formData.append('dir', 'image-edits');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      return response.json();
    },
    {
      manual: true,
    }
  );

  // Submit edit request
  const { loading: submitting, runAsync: submitEdit } = useRequest(
    async (imageUrls: string[], editPrompt: string) => {
      const response = await fetch('/api/edit-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: imageUrls, prompt: editPrompt }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Edit failed');
      }

      return response.json();
    },
    {
      manual: true,
    }
  );

  // Poll for result
  const { data: pollData, run: pollResult } = useRequest(
    async (id: string) => {
      const response = await fetch(`/api/edit-image?id=${id}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to get result');
      }

      return response.json();
    },
    {
      manual: true,
    }
  );

  // Auto-poll when editId is set
  useInterval(
    () => {
      if (editId && pollData?.status !== 'completed' && pollData?.status !== 'failed') {
        pollResult(editId);
      }
    },
    editId && pollData?.status !== 'completed' && pollData?.status !== 'failed' ? 2000 : undefined
  );

  // Update result when poll data changes
  if (pollData?.status === 'completed' && pollData.resultUrl && resultUrl !== pollData.resultUrl) {
    setResultUrl(pollData.resultUrl);
    setEditId(null);
  }

  if (pollData?.status === 'failed') {
    setError(pollData.error || 'Edit failed');
    setEditId(null);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 3) {
      setError('最多只能上传 3 张图片');
      return;
    }

    setImages(files);
    setError('');

    // Generate previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResultUrl(null);

    if (images.length === 0) {
      setError('请至少上传一张图片');
      return;
    }

    if (!prompt.trim()) {
      setError('请输入编辑指令');
      return;
    }

    try {
      // Step 1: Upload images
      const uploadResult = await uploadImages(images);
      const imageUrls = uploadResult.urls;

      // Step 2: Submit edit request
      const editResult = await submitEdit(imageUrls, prompt);
      setEditId(editResult.id);

      // Start polling
      pollResult(editResult.id);
    } catch (err: any) {
      setError(err.message || '处理失败，请重试');
    }
  };

  const isProcessing = uploading || submitting || editId !== null;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="border-b border-border-light dark:border-border-dark bg-surface dark:bg-surface-dark">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <iconify-icon
              icon="mdi:image-edit"
              width="32"
              height="32"
              class="text-primary-light dark:text-primary-dark"
            ></iconify-icon>
            <h1 className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary">AI Image Editor</h1>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/history"
              className="text-text-light-secondary dark:text-text-dark-secondary hover:text-primary-light dark:hover:text-primary-dark"
            >
              <div className="w-6 h-6  md:w-5 md:h-5 shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
                <iconify-icon icon="mdi:history" width="100%" height="100%" style={{ display: 'flex' }}></iconify-icon>
              </div>
            </Link>
            <span className="text-text-light-secondary dark:text-text-dark-secondary">{session?.user?.email}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-text-light-primary dark:text-text-dark-primary">图片编辑器</h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mb-8">
            上传图片并描述你想要的编辑效果，AI 将为你生成编辑后的图片
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="bg-surface dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark">
              <label className="block text-lg font-semibold mb-4 text-text-light-primary dark:text-text-dark-primary">
                上传图片（1-3 张，每张最大 20MB）
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={isProcessing}
                className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary"
              />

              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border border-border-light dark:border-border-dark"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Prompt Input */}
            <div className="bg-surface dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark">
              <label className="block text-lg font-semibold mb-4 text-text-light-primary dark:text-text-dark-primary">
                编辑指令
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isProcessing}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                placeholder="例如：将图片中的文字 'Hello' 改为 'Hi'，保持其他内容不变"
              />
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-2">
                提示：描述得越详细，AI 的编辑效果越好
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-lg bg-error-50 dark:bg-error-900/20 text-error-light dark:text-error-dark">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" variant="primary" isDisabled={isProcessing} className="w-full text-lg py-6">
              {uploading && '上传中...'}
              {submitting && '提交中...'}
              {editId && '处理中...'}
              {!isProcessing && '开始编辑'}
            </Button>
          </form>

          {/* Result */}
          {resultUrl && (
            <div className="mt-8 bg-surface dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark">
              <h3 className="text-2xl font-bold mb-4 text-text-light-primary dark:text-text-dark-primary">编辑结果</h3>
              <img
                src={resultUrl}
                alt="Edited result"
                className="w-full rounded-lg border border-border-light dark:border-border-dark"
              />
              <div className="mt-4 flex gap-4">
                <a
                  href={resultUrl}
                  download
                  className="px-6 py-3 rounded-lg bg-primary-light dark:bg-primary-dark text-white hover:opacity-90 transition-opacity"
                >
                  下载图片
                </a>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setImages([]);
                    setImagePreviews([]);
                    setPrompt('');
                    setResultUrl(null);
                    setError('');
                  }}
                >
                  重新编辑
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
