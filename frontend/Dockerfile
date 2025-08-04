# 🛠️ Použij oficiální Node.js image jako základ
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

ARG BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=${BASE_PATH}

RUN pnpm run build

# 🚀 Použij lehčí image pro běh aplikace
FROM node:20-alpine AS runner

WORKDIR /app

ARG NODE_ENV=production
ARG PORT=3000
ARG BASE_PATH
ARG API_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG GOOGLE_WORKSPACE_DOMAIN

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV BASE_PATH=${BASE_PATH}
ENV API_URL=${API_URL}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV GOOGLE_WORKSPACE_DOMAIN=${GOOGLE_WORKSPACE_DOMAIN}

EXPOSE ${PORT}

CMD ["node", "server.js"]
