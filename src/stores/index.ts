// src/stores/index.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Theme Store - 支持 light, dark, system 三种模式
export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeState {
  // 用户选择的主题模式（可能是 system）
  themeMode: ThemeMode;
  // 实际应用的主题（解析后的，只有 light 或 dark）
  resolvedTheme: ResolvedTheme;
  // 设置主题模式
  setThemeMode: (mode: ThemeMode) => void;
  // 设置解析后的主题
  setResolvedTheme: (theme: ResolvedTheme) => void;
  // 循环切换主题：light -> dark -> system -> light
  cycleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      themeMode: 'system',
      resolvedTheme: 'light',
      setThemeMode: (mode) => set({ themeMode: mode }),
      setResolvedTheme: (theme) => set({ resolvedTheme: theme }),
      cycleTheme: () => {
        const current = get().themeMode;
        const next: ThemeMode = current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light';
        set({ themeMode: next });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Counter Store - Zustand 使用示例
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementBy: (value: number) => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementBy: (value) => set((state) => ({ count: state.count + value })),
}));

// User Store - 更复杂的 Zustand 使用示例
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearUser: () => set({ user: null, error: null }),
}));
