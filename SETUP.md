# AI Image Editor - Setup Guide

这是一个基于 Next.js 16 的 AI 图片编辑应用，使用 WaveSpeed AI 的 Qwen Image Edit 2511 模型进行智能图片编辑。

## 技术栈

- **Next.js 16** - React 框架
- **NextAuth.js** - 用户认证
- **MongoDB** - 数据库
- **Mongoose** - MongoDB ODM
- **Aliyun OSS** - 文件存储
- **WaveSpeed AI** - AI 图片编辑
- **Tailwind CSS 4** - 样式
- **next-intl** - 国际化
- **Zustand** - 状态管理
- **ahooks** - React Hooks 工具库

## 功能特性

✅ 用户注册/登录系统
✅ AI 驱动的智能图片编辑
✅ 支持 1-3 张参考图片
✅ 实时编辑进度跟踪
✅ 编辑历史记录
✅ 暗色/亮色/跟随系统主题
✅ 中英文国际化
✅ 响应式设计
✅ SEO 优化的首页

## 环境要求

- Node.js 18+
- pnpm (推荐) 或 npm
- MongoDB 数据库
- Aliyun OSS 账号
- WaveSpeed AI API Key

## 安装步骤

### 1. 克隆项目并安装依赖

\`\`\`bash
cd next-template
pnpm install
\`\`\`

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

然后编辑 `.env.local` 文件，填入你的配置：

#### MongoDB 配置

**本地 MongoDB:**
\`\`\`
MONGODB_URI=mongodb://localhost:27017/ai-image-editor
\`\`\`

**MongoDB Atlas (推荐):**

1. 访问 https://www.mongodb.com/cloud/atlas
2. 创建免费集群
3. 获取连接字符串
   \`\`\`
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-image-editor
   \`\`\`

#### NextAuth 配置

\`\`\`bash
NEXTAUTH_URL=http://localhost:8888

# 生成密钥：openssl rand -base64 32

NEXTAUTH_SECRET=your-generated-secret-key
\`\`\`

#### Aliyun OSS 配置

1. 登录阿里云控制台
2. 开通 OSS 服务
3. 创建 Bucket
4. 获取 AccessKey

\`\`\`
FILE_ACCESS_KEY_ID=your-access-key-id
FILE_ACCESS_KEY_SECRET=your-access-key-secret
FILE_ENDPOINT=oss-cn-hangzhou.aliyuncs.com
FILE_BUCKET_NAME=your-bucket-name
FILE_OSS_URL=https://your-bucket-name.oss-cn-hangzhou.aliyuncs.com/
\`\`\`

#### WaveSpeed AI 配置

1. 访问 https://wavespeed.ai
2. 注册账号并获取 API Key

\`\`\`
WAVESPEED_KEY=your-wavespeed-api-key
WAVESPEED_URL=https://api.wavespeed.ai/api/v3
\`\`\`

### 3. 启动开发服务器

\`\`\`bash
pnpm dev
\`\`\`

应用将在 http://localhost:8888 启动

## 项目结构

\`\`\`
next-template/
├── app/
│ ├── [locale]/ # 国际化路由
│ │ ├── page.tsx # 首页
│ │ ├── editor/ # 图片编辑页面
│ │ ├── history/ # 编辑历史页面
│ │ └── auth/ # 认证页面
│ ├── api/ # API 路由
│ │ ├── auth/ # 认证 API
│ │ ├── upload/ # 文件上传 API
│ │ ├── edit-image/ # 图片编辑 API
│ │ └── history/ # 历史记录 API
│ └── globals.css # 全局样式
├── src/
│ ├── components/ # React 组件
│ ├── hooks/ # 自定义 Hooks
│ ├── i18n/ # 国际化配置
│ ├── lib/ # 工具库
│ ├── models/ # MongoDB 模型
│ ├── stores/ # Zustand 状态管理
│ └── types/ # TypeScript 类型定义
├── messages/ # 国际化消息文件
└── public/ # 静态资源
\`\`\`

## 使用说明

### 1. 注册账户

访问 http://localhost:8888/zh-CN/auth/signup 注册新账户

### 2. 编辑图片

1. 登录后访问编辑器页面
2. 上传 1-3 张图片（每张最大 20MB）
3. 输入编辑指令，例如：
   - "将图片中的文字 'Hello' 改为 'Hi'，保持其他内容不变"
   - "添加一个咖啡杯在右上角，不改变其他内容"
   - "将背景改为现代办公室，保持人物和品牌标志不变"
4. 点击"开始编辑"
5. 等待 AI 处理（通常 10-30 秒）
6. 下载编辑后的图片

### 3. 查看历史

访问历史页面查看所有编辑记录，可以重新下载之前的编辑结果

## 部署

### Vercel 部署（推荐）

1. 推送代码到 GitHub
2. 访问 https://vercel.com
3. 导入项目
4. 配置环境变量
5. 部署

### 自己的服务器

\`\`\`bash

# 构建生产版本

pnpm build

# 启动生产服务器

pnpm start
\`\`\`

## 常见问题

### Q: MongoDB 连接失败？

A: 检查 MONGODB_URI 是否正确，如果使用 MongoDB Atlas，确保 IP 白名单已配置

### Q: 图片上传失败？

A: 检查 Aliyun OSS 配置是否正确，Bucket 权限是否设置为公共读

### Q: AI 编辑失败？

A: 检查 WaveSpeed API Key 是否有效，账户余额是否充足

### Q: 主题切换不生效？

A: 清除浏览器 Cookie 和 localStorage，刷新页面

## 开发建议

- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 组件保持简洁，单一职责
- API 路由添加适当的错误处理
- 敏感信息使用环境变量

## 许可证

MIT License

## 支持

如有问题，请提交 Issue 或联系开发者
\`\`\`
