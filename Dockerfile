# ==============================================================================
# Multi-stage Dockerfile for Zen Family Spa Website (Coolify / Docker Deployment)
# ==============================================================================

# Stage 1: Build static assets
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first for Docker caching
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Accept Build-time environment variables for Vite
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_SITE_NAME
ARG VITE_SITE_URL
ARG VITE_WHATSAPP_CENTRAL

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_SITE_NAME=$VITE_SITE_NAME
ENV VITE_SITE_URL=$VITE_SITE_URL
ENV VITE_WHATSAPP_CENTRAL=$VITE_WHATSAPP_CENTRAL

# Build production bundle
RUN npm run build

# Stage 2: Production Nginx Server
FROM nginx:alpine

# Install curl and wget for reliable container health monitoring
RUN apk add --no-cache curl wget

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration with SPA routing and caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Production Healthcheck using explicit IPv4 loopback (127.0.0.1:80/healthz)
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -fs http://127.0.0.1:80/healthz || wget -q -O - http://127.0.0.1:80/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
