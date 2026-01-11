// src/hooks/useEditorController.ts
import { useState } from 'react';
import { useRequest, useInterval } from 'ahooks';

export function useEditorController() {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  // 1. 上传图片
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
    { manual: true }
  );

  // 2. 提交编辑任务
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
    { manual: true }
  );

  // 3. 轮询结果
  const { data: pollData, run: pollResult } = useRequest(
    async (id: string) => {
      const response = await fetch(`/api/edit-image?id=${id}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to get result');
      }
      return response.json();
    },
    { manual: true }
  );

  // 自动轮询逻辑
  const isPolling = editId && pollData?.status !== 'completed' && pollData?.status !== 'failed';

  useInterval(
    () => {
      if (isPolling) {
        pollResult(editId);
      }
    },
    isPolling ? 2000 : undefined
  );

  // 监听轮询状态变化
  // 注意：在实际 Effect 中处理状态更新更安全，这里简化处理
  if (isPolling && pollData?.status === 'completed' && pollData.resultUrl) {
    setResultUrl(pollData.resultUrl);
    setEditId(null);
  } else if (isPolling && pollData?.status === 'failed') {
    setError(pollData.error || 'Edit failed');
    setEditId(null);
  }

  // UI 交互处理函数
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 3) {
      setError('最多只能上传 3 张图片');
      return;
    }
    setImages(files);
    setError('');
    // 生成预览
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleReset = () => {
    setImages([]);
    setImagePreviews([]);
    setPrompt('');
    setResultUrl(null);
    setError('');
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResultUrl(null);

    if (images.length === 0) return setError('请至少上传一张图片');
    if (!prompt.trim()) return setError('请输入编辑指令');

    try {
      const uploadResult = await uploadImages(images);
      const editResult = await submitEdit(uploadResult.urls, prompt);
      setEditId(editResult.id);
      pollResult(editResult.id);
    } catch (err: any) {
      setError(err.message || '处理失败，请重试');
      setEditId(null);
    }
  };

  const isProcessing = uploading || submitting || !!editId;

  return {
    state: { images, imagePreviews, prompt, error, resultUrl, isProcessing },
    actions: { setPrompt, handleImageChange, handleSubmit, handleReset },
    statusText: uploading ? '上传中...' : submitting ? '提交中...' : editId ? 'AI 处理中...' : '开始编辑',
  };
}
