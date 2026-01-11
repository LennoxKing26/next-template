# 1. 基础镜像
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

# 2. 依赖安装
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# 3. 构建阶段 (Builder)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 🔥🔥🔥 核心修改区：注入假变量 🔥🔥🔥
# 这里的 trick 是：给它假的地址，骗过 build 时的检查。
# 只要符合 URL 格式，Next.js 就不会报错，build 就能通过。
# 真正的连接是在运行时（Runner 阶段）读取服务器上的 .env 发生的。
ENV MONGODB_URI="mongodb://mock_user:mock_pass@localhost:27017/mock_db"
ENV NEXTAUTH_SECRET="mock_secret_for_build_only"
ENV NEXTAUTH_URL="http://localhost:3000"
# 如果你有其他必填的环境变量，也在这里随便写个假值
# ENV WAVESPEED_KEY="mock_key"

# 开始构建
RUN pnpm run build

# 4. 生产运行阶段 (Runner)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# 禁用 Next.js 的遥测数据
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# 暴露端口 3008
EXPOSE 3008
ENV PORT=3008
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
