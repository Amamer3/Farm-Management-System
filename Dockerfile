FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env.example .env

ARG NEXT_PUBLIC_APP_NAME=Agrocyms
ARG NEXT_PUBLIC_APP_TAGLINE="Farm management"
ARG NEXT_PUBLIC_APP_TITLE="Agrocyms - Multi-Enterprise Farm Management"
ARG NEXT_PUBLIC_APP_DESCRIPTION="Agrocyms multi-enterprise farm management for poultry, small ruminants, and herd operations — inventory, production, and health tracking"
ARG NEXT_PUBLIC_LOGO_PATH="/agrocyms-logo.png"
ARG NEXT_PUBLIC_TWITTER_HANDLE=@agrocyms
ARG NEXT_PUBLIC_SITE_URL=https://agrocyms.com
ARG NEXT_PUBLIC_SITE_LOCALE=en
ARG NEXT_PUBLIC_API_BASE_URL=/api
ARG NEXT_PUBLIC_REQUEST_TIMEOUT_MS=30000
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
ARG NEXT_PUBLIC_BING_SITE_VERIFICATION
ARG API_PROXY_TARGET=http://host.docker.internal:5050

ENV NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME \
    NEXT_PUBLIC_APP_TAGLINE=$NEXT_PUBLIC_APP_TAGLINE \
    NEXT_PUBLIC_APP_TITLE=$NEXT_PUBLIC_APP_TITLE \
    NEXT_PUBLIC_APP_DESCRIPTION=$NEXT_PUBLIC_APP_DESCRIPTION \
    NEXT_PUBLIC_LOGO_PATH=$NEXT_PUBLIC_LOGO_PATH \
    NEXT_PUBLIC_TWITTER_HANDLE=$NEXT_PUBLIC_TWITTER_HANDLE \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_SITE_LOCALE=$NEXT_PUBLIC_SITE_LOCALE \
    NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL \
    NEXT_PUBLIC_REQUEST_TIMEOUT_MS=$NEXT_PUBLIC_REQUEST_TIMEOUT_MS \
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION \
    NEXT_PUBLIC_BING_SITE_VERIFICATION=$NEXT_PUBLIC_BING_SITE_VERIFICATION \
    API_PROXY_TARGET=$API_PROXY_TARGET \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM base AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8080 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
    CMD node -e "require('http').get('http://127.0.0.1:8080/', (res) => process.exit(res.statusCode < 500 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "server.js"]
