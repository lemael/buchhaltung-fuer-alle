# =========================
# Stage 1: Build
# =========================
FROM node:22-alpine AS build

WORKDIR /app

# Build argument fourni par Railway
ARG VITE_API_URL

# Rend la variable disponible pour Vite
ENV VITE_API_URL=$VITE_API_URL

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build Vue application
RUN npm run build


# =========================
# Stage 2: Production
# =========================
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy Vue production build
COPY --from=build /app/dist /usr/share/nginx/html

# Configure Nginx for Vue Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Railway / container port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]