# ==============================
# Stage 1: Build React/Vite app
# ==============================
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency files first
COPY package.json package-lock.json ./

# Install exact dependencies
RUN npm ci

# Copy application source
COPY . .

# Build production version
RUN npm run build


# ==============================
# Stage 2: Production web server
# ==============================
FROM nginx:alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy our React production build

# Copy our React production build
COPY --from=build /app/dist /usr/share/nginx/html

# Use our Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
