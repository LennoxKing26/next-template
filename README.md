# AI Image Editor

一个基于 Next.js 16 的 AI 驱动图片编辑应用。

## 当前状态

✅ **前端完全正常**

- 首页展示完美
- 主题切换正常（亮色/暗色/跟随系统）
- 国际化支持（中英文）
- 响应式设计
- 所有页面布局完成

⚠️ **后端需要配置**

- NextAuth 需要 MongoDB 连接才能工作
- 文件上传需要阿里云 OSS 配置
- AI 编辑需要 WaveSpeed API Key

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

复制 `.env.local` 文件并填入真实配置：

**必需配置（用于用户认证）：**

```env
# MongoDB - 必须配置才能使用登录功能
MONGODB_URI=mongodb://localhost:27017/ai-image-editor
# 或使用 MongoDB Atlas（推荐）
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-image-editor

# NextAuth Secret - 生成方法：openssl rand -base64 32
NEXTAUTH_SECRET=your-generated-secret-here
```

**可选配置（用于完整功能）：**

```env
# 阿里云 OSS（文件上传）
FILE_ACCESS_KEY_ID=your-key
FILE_ACCESS_KEY_SECRET=your-secret
FILE_ENDPOINT=oss-cn-hangzhou.aliyuncs.com
FILE_BUCKET_NAME=your-bucket
FILE_OSS_URL=https://your-bucket.oss-cn-hangzhou.aliyuncs.com/

# WaveSpeed AI（图片编辑）
WAVESPEED_KEY=your-api-key
WAVESPEED_URL=https://api.wavespeed.ai/api/v3
```

### 3. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:8888

## 功能说明

### 无需配置即可使用

- ✅ 浏览首页
- ✅ 查看功能介绍
- ✅ 切换主题（亮色/暗色/跟随系统）
- ✅ 切换语言（中文/英文）
- ✅ 查看示例页面

### 需要 MongoDB 配置

- ⏳ 用户注册
- ⏳ 用户登录
- ⏳ 查看编辑历史

### 需要完整配置

- ⏳ 上传图片
- ⏳ AI 图片编辑
- ⏳ 保存编辑结果

## MongoDB 配置指南

### 方案 1：本地 MongoDB

1. 安装 MongoDB：https://www.mongodb.com/try/download/community
2. 启动 MongoDB 服务
3. 使用连接字符串：`mongodb://localhost:27017/ai-image-editor`

### 方案 2：MongoDB Atlas（推荐，免费）

1. 访问 https://www.mongodb.com/cloud/atlas
2. 注册并创建免费集群
3. 创建数据库用户
4. 获取连接字符串
5. 添加 IP 白名单（0.0.0.0/0 允许所有）

## 常见问题

### Q: 为什么登录页面报错？

A: NextAuth 需要 MongoDB 连接才能工作。请配置 `MONGODB_URI` 环境变量。

### Q: 如何生成 NEXTAUTH_SECRET？

A: 运行命令：`openssl rand -base64 32`

### Q: 可以不配置数据库吗？

A: 可以浏览前端页面，但无法使用登录、注册和历史记录功能。

### Q: 主题切换不生效？

A: 清除浏览器 Cookie 和 localStorage，然后刷新页面。

## 技术栈

- Next.js 16 + React 19
- NextAuth.js（认证）
- MongoDB + Mongoose（数据库）
- Aliyun OSS（文件存储）
- WaveSpeed AI（图片编辑）
- Tailwind CSS 4（样式）
- Zustand（状态管理）
- ahooks（工具库）

## 项目结构

```
├── app/                    # Next.js App Router
│   ├── [locale]/          # 国际化路由
│   │   ├── page.tsx       # 首页
│   │   ├── editor/        # 编辑器
│   │   ├── history/       # 历史记录
│   │   └── auth/          # 认证页面
│   └── api/               # API 路由
├── src/
│   ├── components/        # React 组件
│   ├── hooks/             # 自定义 Hooks
│   ├── lib/               # 工具库
│   ├── models/            # 数据库模型
│   └── stores/            # 状态管理
└── messages/              # 国际化消息
```

## 详细文档

查看 `SETUP.md` 获取完整的配置和部署指南。

## 许可证

MIT
