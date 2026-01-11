'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, Link } from '@/i18n/navigation';
import { Button, Skeleton } from '@heroui/react';
import { useRequest } from 'ahooks'; // ✅ 引入 ahooks
import { HistoryCard } from './HistoryCard';

interface EditRecord {
  _id: string;
  prompt: string;
  images: string[];
  resultUrl?: string;
  status: string;
  createdAt: string;
}

// 1. 定义获取数据的 Service 函数
const fetchHistoryService = async (): Promise<EditRecord[]> => {
  const response = await fetch('/api/history');
  if (!response.ok) throw new Error('获取记录失败');
  const data = await response.json();
  // 直接在这里处理倒序逻辑
  return (data.history || []).reverse();
};

export default function HistoryList() {
  const { status } = useSession();
  const router = useRouter();

  // 2. 使用 useRequest 接管数据请求
  const {
    data: history = [], // 默认值为空数组
    loading,
    error,
    refresh, // ahooks 提供的重试方法
  } = useRequest(fetchHistoryService, {
    // 🔥 核心：只有当用户已登录时，才发起请求
    ready: status === 'authenticated',
    // 自动刷新依赖：如果 session 状态变了，可能会重新触发（配合 ready 使用很稳）
    refreshDeps: [status],
  });

  // 鉴权重定向 (这是副作用，依然需要 useEffect)
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Loading 状态：显示骨架屏
  // 注意：useRequest 的 loading 包含了初始请求和 refresh 时的状态
  if (loading || status === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="rounded-xl h-[300px]" />
        ))}
      </div>
    );
  }

  // Error 状态
  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 text-danger">
        <iconify-icon icon="mdi:alert-circle-outline" width="64" />
        <p className="mt-4 text-lg font-medium">加载失败: {error.message}</p>
        <Button color="primary" variant="flat" className="mt-4" onPress={refresh}>
          重试
        </Button>
      </div>
    );
  }

  // Empty 状态
  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-content1/30 rounded-3xl border border-dashed border-default-200">
        <div className="p-6 bg-default-100 rounded-full mb-6">
          <iconify-icon icon="mdi:image-filter-vintage" width="64" class="text-default-400" />
        </div>
        <h3 className="text-xl font-bold text-default-700">暂无编辑记录</h3>
        <p className="text-default-500 mt-2 mb-8 max-w-xs text-center">
          您还没有生成过任何图片，快去尝试 AI 的魔法吧！
        </p>
        <Link href="/editor">
          <Button color="primary" size="lg" startContent={<iconify-icon icon="mdi:plus" width="24" />}>
            开始第一次创作
          </Button>
        </Link>
      </div>
    );
  }

  // 正常列表状态
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
      {history.map((record) => (
        <HistoryCard key={record._id} record={record} />
      ))}
    </div>
  );
}
