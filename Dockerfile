# syntax=docker/dockerfile:1

# ---- deps: install once, reused by the build stage ----
FROM node:22-slim AS deps
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
# postinstall runs `prisma generate`, which needs the schema present already.
COPY prisma ./prisma
RUN npm ci

# ---- builder: prisma generate + next build (standalone output) ----
FROM node:22-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# `next build` calls generateStaticParams() in src/app/(public)/[slug]/page.tsx,
# which queries Postgres for every published slug to pre-render — so, same as
# on Railway (whose build reaches Postgres over its public proxy), this build
# needs a real, reachable DATABASE_URL, passed in as a build arg. It is only
# used transiently to run the build; it is not baked into any image layer's
# final filesystem (ENV values set in a build stage don't carry into a later
# COPY --from stage that only copies specific directories, as the runner
# stage here does).
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npm run build
# Drop devDependencies now that the build is done — keeps the generated
# Prisma client (node_modules/.prisma, node_modules/@prisma/client) and
# every runtime dep, just not typescript/tailwind/eslint/etc.
RUN npm prune --omit=dev

# ---- runner: shared by the Cloud Run web service AND the Cloud Run Job
# (scripts/publish-run-tier.mjs) that replaces the Railway cron service, so
# it needs more than the Next.js standalone trace alone would pull in.
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080

RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs \
    && chown nextjs:nodejs /app
# The WORKDIR itself is created root-owned before any COPY runs, and
# `COPY --chown` only sets ownership on what it copies in — not on /app as a
# directory node. publish-run-tier.mjs writes a scratch file directly into
# ROOT (== /app, scripts/publish-run-tier.mjs:26) for its content-check gate,
# which needs /app itself to be writable by the nextjs user, not just its
# contents.

# Full node_modules (post `prisma generate`, so the generated client is
# included) rather than the trimmed standalone trace — the trace only covers
# what the Next.js server itself imports, not scripts/publish-run-tier.mjs's
# direct `pg` import.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# next.config.ts's `build` script already copied public/ and .next/static/
# into .next/standalone/.next, so these two bring the whole runnable web app.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone/server.js ./server.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone/public ./public

# publish-run-tier Cloud Run Job: the script, its queue file, and the
# content gate it shells out to (see scripts/publish-run-tier.mjs).
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/data ./data
COPY --from=builder --chown=nextjs:nodejs /app/.claude/skills/write-blog-article/scripts/check-content.js ./.claude/skills/write-blog-article/scripts/check-content.js

USER nextjs
EXPOSE 8080
CMD ["node", "server.js"]
