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

# ✨ 这里的 ENV 全部删掉了！代码重构后不需要 Mock 了 ✨
# 只有 NEXT_PUBLIC_ 开头的变量如果需要才要在这里加

RUN pnpm run build

# 4. 生产运行阶段 (Runner)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3008
ENV PORT=3008
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
