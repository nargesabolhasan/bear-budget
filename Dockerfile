# Base image
FROM node:20-alpine AS base

# Enable corepack (Yarn)
RUN corepack enable

WORKDIR /app



# Dependencies layer
FROM base AS deps

# Install libc6-compat for some native deps
RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock ./

# Install deps (including dev deps for build)
RUN yarn install --frozen-lockfile

# Builder
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

RUN yarn build



# Production runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy only the necessary output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Fix permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
