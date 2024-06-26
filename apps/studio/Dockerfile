# Builder
FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update


WORKDIR /app
RUN yarn global add turbo
COPY . .

ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1

RUN turbo prune --scope=studio --docker

# Installer
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add pnpm
RUN yarn global add turbo

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

ARG PORT
ENV PORT=$PORT

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN turbo build --filter=studio...

# Runner
FROM node:alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/studio/next.config.js .
COPY --from=installer /app/apps/studio/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/studio/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/studio/.next/static ./apps/studio/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/studio/public ./apps/studio/public

CMD node apps/studio/server.js