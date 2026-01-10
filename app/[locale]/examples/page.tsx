'use client';

import { Button } from '@heroui/react';
import { useCounterStore, useUserStore } from '@/stores';
import { useRequest, useDebounce, useThrottle, useToggle, useInterval } from 'ahooks';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';

export default function ExamplesPage() {
  // ===== Zustand Counter Store 示例 =====
  const { count, increment, decrement, reset, incrementBy } = useCounterStore();

  // ===== Zustand User Store 示例 =====
  const { user, isLoading, error, setUser, setLoading, clearUser } = useUserStore();

  // ===== ahooks useToggle 示例 =====
  const [isVisible, { toggle, setLeft, setRight }] = useToggle(false, true);

  // ===== ahooks useDebounce 示例 =====
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, { wait: 500 });

  // ===== ahooks useThrottle 示例 =====
  const [clickCount, setClickCount] = useState(0);
  const throttledClickCount = useThrottle(clickCount, { wait: 1000 });

  // ===== ahooks useInterval 示例 =====
  const [intervalCount, setIntervalCount] = useState(0);
  const [intervalRunning, setIntervalRunning] = useState(false);

  useInterval(
    () => {
      setIntervalCount((c) => c + 1);
    },
    intervalRunning ? 1000 : undefined
  );

  // ===== ahooks useRequest 示例 =====
  const {
    data,
    loading,
    run: fetchUser,
  } = useRequest(
    async () => {
      setLoading(true);
      // 模拟 API 请求
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
      };
      setUser(mockUser);
      setLoading(false);
      return mockUser;
    },
    {
      manual: true,
    }
  );

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="text-primary-light dark:text-primary-dark underline">
          ← 返回首页<iconify-icon icon="mdi:home"></iconify-icon>
        </Link>
        <h1 className="text-3xl font-bold text-text-light-primary dark:text-text-dark-primary">
          Zustand & ahooks 示例
        </h1>
      </div>

      {/* Zustand Counter Store 示例 */}
      <section className="p-6 rounded-lg bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark">
        <h2 className="text-2xl font-semibold mb-4 text-text-light-primary dark:text-text-dark-primary">
          📦 Zustand Counter Store
        </h2>
        <div className="space-y-4">
          <div className="text-4xl font-bold text-center py-4 text-text-light-primary dark:text-text-dark-primary">
            {count}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="primary" onClick={increment}>
              +1
            </Button>
            <Button variant="primary" onClick={decrement}>
              -1
            </Button>
            <Button variant="secondary" onClick={() => incrementBy(5)}>
              +5
            </Button>
            <Button variant="tertiary" onClick={reset}>
              重置
            </Button>
          </div>
        </div>
      </section>

      {/* Zustand User Store 示例 */}
      <section className="p-6 rounded-lg bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark">
        <h2 className="text-2xl font-semibold mb-4 text-text-light-primary dark:text-text-dark-primary">
          👤 Zustand User Store + ahooks useRequest
        </h2>
        <div className="space-y-4">
          {user ? (
            <div className="p-4 bg-success-50 dark:bg-success-900/20 rounded">
              <p className="text-text-light-primary dark:text-text-dark-primary">
                <strong>ID:</strong> {user.id}
              </p>
              <p className="text-text-light-primary dark:text-text-dark-primary">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="text-text-light-primary dark:text-text-dark-primary">
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          ) : (
            <p className="text-text-light-secondary dark:text-text-dark-secondary">暂无用户数据</p>
          )}
          {error && <p className="text-error-light dark:text-error-dark">{error}</p>}
          <div className="flex gap-2">
            <Button variant="primary" onClick={fetchUser} isDisabled={isLoading}>
              {isLoading ? '加载中...' : '获取用户'}
            </Button>
            <Button variant="tertiary" onClick={clearUser}>
              清除用户
            </Button>
          </div>
        </div>
      </section>

      {/* ahooks useToggle 示例 */}
      <section className="p-6 rounded-lg bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark">
        <h2 className="text-2xl font-semibold mb-4 text-text-light-primary dark:text-text-dark-primary">
          🔄 ahooks useToggle
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <p className="text-text-light-primary dark:text-text-dark-primary">
              当前状态: {isVisible ? '✅ 显示' : '❌ 隐藏'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="primary" onClick={toggle}>
              切换
            </Button>
            <Button variant="secondary" onClick={setLeft}>
              设为隐藏
            </Button>
            <Button variant="secondary" onClick={setRight}>
              设为显示
            </Button>
          </div>
        </div>
      </section>

      {/* ahooks useDebounce 示例 */}
      <section className="p-6 rounded-lg bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark">
        <h2 className="text-2xl font-semibold mb-4 text-text-light-primary dark:text-text-dark-primary">
          ⏱️ ahooks useDebounce
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="输入搜索文本（500ms 防抖）"
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-light-primary dark:text-text-dark-primary"
          />
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <p className="text-text-light-primary dark:text-text-dark-primary">
              <strong>实时输入:</strong> {searchText}
            </p>
            <p className="text-text-light-primary dark:text-text-dark-primary">
              <strong>防抖后:</strong> {debouncedSearchText}
            </p>
          </div>
        </div>
      </section>

      {/* ahooks useThrottle 示例 */}
      <section className="p-6 rounded-lg bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark">
        <h2 className="text-2xl font-semibold mb-4 text-text-light-primary dark:text-text-dark-primary">
          🚦 ahooks useThrottle
        </h2>
        <div className="space-y-4">
          <Button variant="primary" onClick={() => setClickCount((c) => c + 1)}>
            点击我（节流 1000ms）
          </Button>
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <p className="text-text-light-primary dark:text-text-dark-primary">
              <strong>实际点击次数:</strong> {clickCount}
            </p>
            <p className="text-text-light-primary dark:text-text-dark-primary">
              <strong>节流后计数:</strong> {throttledClickCount}
            </p>
          </div>
        </div>
      </section>

      {/* ahooks useInterval 示例 */}
      <section className="p-6 rounded-lg bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark">
        <h2 className="text-2xl font-semibold mb-4 text-text-light-primary dark:text-text-dark-primary">
          ⏰ ahooks useInterval
        </h2>
        <div className="space-y-4">
          <div className="text-4xl font-bold text-center py-4 text-text-light-primary dark:text-text-dark-primary">
            {intervalCount}
          </div>
          <div className="flex gap-2">
            <Button variant="primary" onClick={() => setIntervalRunning(!intervalRunning)}>
              {intervalRunning ? '暂停' : '开始'}
            </Button>
            <Button
              variant="tertiary"
              onClick={() => {
                setIntervalCount(0);
                setIntervalRunning(false);
              }}
            >
              重置
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
