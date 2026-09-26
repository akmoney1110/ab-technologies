# ============================================================
# Stage 1: Build + Prerender React/Vite application
# ============================================================

FROM node:22-bookworm-slim AS build

WORKDIR /app


# ------------------------------------------------------------
# Install Chromium/Puppeteer runtime dependencies
# ------------------------------------------------------------

RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libexpat1 \
    libgbm1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    wget \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*


# ------------------------------------------------------------
# Copy dependency files first for Docker layer caching
# ------------------------------------------------------------

COPY package.json package-lock.json ./


# ------------------------------------------------------------
# Install exact dependencies
# ------------------------------------------------------------

RUN npm ci


# ------------------------------------------------------------
# Copy application source
# ------------------------------------------------------------

COPY . .


# ------------------------------------------------------------
# Build Vite + prerender public SEO pages
# ------------------------------------------------------------

RUN npm run build:seo


# ============================================================
# Stage 2: Production Nginx
# ============================================================

FROM nginx:alpine


# ------------------------------------------------------------
# Remove default Nginx website
# ------------------------------------------------------------

RUN rm -rf /usr/share/nginx/html/*


# ------------------------------------------------------------
# Copy completed Vite + prerendered build
# ------------------------------------------------------------

COPY --from=build /app/dist /usr/share/nginx/html


# ------------------------------------------------------------
# Install application Nginx configuration
# ------------------------------------------------------------

COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]