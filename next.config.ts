// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// 先写你自己的 Next 配置
const config: NextConfig = {
  // 比如：
  // reactStrictMode: true,
  // experimental: { serverActions: true },
};

// 用 next-intl 包一层
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(config);
