# AI Image Editor - Next.js Template

一个基于 Next.js 的 AI 图片编辑应用模板。

## 技术栈分析

### 核心框架

| 技术       | 版本   | 说明                            |
| ---------- | ------ | ------------------------------- |
| Next.js    | 16.0.3 | React 全栈框架，使用 App Router |
| React      | 19.2.0 | UI 库                           |
| TypeScript | ^5     | 类型安全                        |

### UI 组件库

| 技术          | 版本    | 说明                         |
| ------------- | ------- | ---------------------------- |
| HeroUI        | 2.8.7   | 主要 UI 组件库（原 NextUI）  |
| Framer Motion | 12.25.0 | 动画库                       |
| iconify-icon  | 3.0.2   | 图标库（Web Component 方式） |

### 样式方案

| 技术          | 版本          | 说明                         |
| ------------- | ------------- | ---------------------------- |
| Tailwind CSS  | ^4            | 原子化 CSS 框架              |
| @heroui/theme | 2.4.18-beta.7 | HeroUI 主题插件              |
| 自定义主题    | -             | 基于绿色主色调的完整色彩系统 |

### 主题系统

- **next-themes** (0.4.6): 支持亮色/暗色/跟随系统三种模式
- **darkMode: 'class'**: 通过 CSS class 切换主题
- **自定义色彩变量**: 包含 primary、secondary、success、warning、error 等完整色阶

### 国际化 (i18n)

| 技术      | 版本  | 说明                   |
| --------- | ----- | ---------------------- |
| next-intl | 4.5.5 | Next.js 国际化解决方案 |

**支持语言**:

- 🇨🇳 简体中文 (zh-CN) - 默认语言
- 🇺🇸 English (en)
- 🇰🇷 한국어 (ko)

**路由策略**: `localePrefix: 'always'` - 所有语言都带前缀

### 状态管理

| 技术    | 版本  | 说明           |
| ------- | ----- | -------------- |
| Zustand | 5.0.9 | 轻量级状态管理 |

### 工具库

| 技术   | 版本  | 说明                                             |
| ------ | ----- | ------------------------------------------------ |
| ahooks | 3.9.6 | React Hooks 工具库（useRequest、useInterval 等） |

### 认证系统

| 技术        | 版本          | 说明                   |
| ----------- | ------------- | ---------------------- |
| NextAuth.js | 5.0.0-beta.30 | 身份认证（Auth.js v5） |
| bcryptjs    | 3.0.3         | 密码加密               |

### 数据库

| 技术     | 版本  | 说明         |
| -------- | ----- | ------------ |
| MongoDB  | -     | NoSQL 数据库 |
| Mongoose | 9.1.2 | MongoDB ODM  |

### 文件存储

| 技术    | 版本   | 说明                |
| ------- | ------ | ------------------- |
| ali-oss | 6.23.0 | 阿里云 OSS 文件存储 |

## 项目结构

```
├── app/
│   ├── [locale]/              # 国际化路由
│   │   ├── page.tsx           # 首页
│   │   ├── layout.tsx         # 布局
│   │   ├── auth/              # 认证页面
│   │   │   ├── signin/        # 登录
│   │   │   └── signup/        # 注册
│   │   ├── editor/            # 编辑器页面
│   │   ├── history/           # 历史记录页面
│   │   └── examples/          # 示例页面
│   ├── api/                   # API 路由
│   └── globals.css            # 全局样式
├── messages/                  # 国际化翻译文件
│   ├── en.json
│   ├── zh-CN.json
│   └── ko.json
├── src/
│   ├── components/            # 公共组件
│   ├── hooks/                 # 自定义 Hooks
│   ├── i18n/                  # 国际化配置
│   ├── lib/                   # 工具库
│   ├── models/                # 数据模型
│   ├── stores/                # Zustand 状态
│   ├── themes/                # 主题文件
│   ├── types/                 # TypeScript 类型
│   └── utils/                 # 工具函数
└── public/                    # 静态资源
```

## 开发命令

```bash
# 安装依赖
pnpm install

# 开发模式（自动打开浏览器 http://localhost:8888）
pnpm dev

# 构建
pnpm build

# 生产模式
pnpm start

# 代码检查
pnpm lint
```

## 特性

- ✅ Next.js 16 App Router
- ✅ TypeScript 支持
- ✅ HeroUI 组件库
- ✅ Tailwind CSS 4
- ✅ 暗色/亮色主题切换
- ✅ 多语言支持 (中/英/韩)
- ✅ NextAuth 身份认证
- ✅ MongoDB 数据存储
- ✅ 阿里云 OSS 文件上传
- ✅ AI 图片编辑功能
- ✅ 响应式设计
