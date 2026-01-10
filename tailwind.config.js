/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: '[data-theme="dark"]',
  theme: {
    extend: {
      screens: {
        xs: '376px', // 新增：适配 iPhone 6/7/8 等小屏
        '2.5xl': '1600px',
        '3xl': '1921px',
      },
      colors: {
        // ✅ 文本颜色（明暗统一设定）
        text: {
          light: {
            primary: '#213547',
            secondary: '#21354799', // 60%
            disabled: '#21354761', // 38%
            onPrimary: '#FFFFFF',
            link: '#03C188',
          },
          dark: {
            primary: '#FFFFFFD9', // 85%
            secondary: '#FFFFFF99', // 60%
            disabled: '#FFFFFF61', // 38%
            onPrimary: '#FFFFFF',
            link: '#18D1A0',
          },
          light: 'rgba(0,0,0,0.86)',
          lightSecondary: 'rgba(0,0,0,0.56)',
          dark: 'rgba(255,255,255,0.86)',
          darkSecondary: 'rgba(255,255,255,0.55)',
        },
        // ✅ 背景色定义（用于页面基础）
        background: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },

        card: {
          light: '#C8F1E5',
          dark: '#1A3830',
        },
        // ✅ 主色调：亮青绿，主视觉
        primary: {
          DEFAULT: '#03C188',
          light: '#03C188',
          dark: '#18D1A0',
          50: '#E6FBF5',
          100: '#C4F5E3',
          200: '#98EDD1',
          300: '#6BE4BF',
          400: '#3CD8A6',
          500: '#03C188',
          600: '#02AC78',
          700: '#02946A',
          800: '#02795A',
          900: '#015F4A',
        },
        secondary: {
          DEFAULT: '#E3F0EC',
          light: '#E3F0EC',
          dark: '#5FC4A8',
          50: '#F2F9F6',
          100: '#E3F0EC',
          200: '#C4E0D7',
          300: '#A5D0C2',
          400: '#84C2B0',
          500: '#5FC4A8',
          600: '#4FB297',
          700: '#429E85',
          800: '#368B73',
          900: '#256C58',
        },

        // 新增语义色：卡片/面板表面
        surface: {
          // 亮色下：主色轻度染色的浅雾面
          DEFAULT: '#EAF9F3', // = color-mix(#03C188 10%, #fff)
          // 暗黑下：深灰绿调，低亮度，不刺眼
          dark: '#263530', // = color-mix(#03C188 16%, #0D0F0E)
          // 可选层级
          1: '#EFFAF6',
          2: '#E6F6F1',
          3: '#DFF2EC',
          dark1: '#16201D',
          dark2: '#1D2825',
          dark3: '#23312E',
        },
        border: {
          light: 'rgba(0,0,0,0.08)',
          dark: 'rgba(255,255,255,0.12)',
        },
        // ✅ 协调灰阶：比默认 Tailwind 更柔和
        gray: {
          50: '#F8FAF9',
          100: '#EFF1F0',
          200: '#E1E4E3',
          300: '#C8CDCC',
          400: '#A3A9A8',
          500: '#7B8180',
          600: '#5D6261',
          700: '#474B4A',
          800: '#2F3231',
          900: '#1C1D1D',
        },

        // ✅ 成功状态：偏深绿色，避免和主色冲突
        success: {
          DEFAULT: '#1DA674',
          light: '#1DA674',
          dark: '#117552',
          50: '#E7F8F1',
          100: '#C7F0DF',
          200: '#A1E6C9',
          300: '#71D3B0',
          400: '#44C59B',
          500: '#1DA674',
          600: '#158D62',
          700: '#117552',
          800: '#0E5C42',
          900: '#0B4935',
        },

        // ✅ 警告状态：亮黄橙色，亲和易读
        warning: {
          DEFAULT: '#F59E0B',
          light: '#F59E0B',
          dark: '#B45309',
          50: '#FFFAEB',
          100: '#FFF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },

        // ✅ 错误状态：经典错误红，无需调整
        error: {
          DEFAULT: '#EF4444',
          light: '#EF4444',
          dark: '#B91C1C',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
      },
    },
  },
  plugins: [],
};
