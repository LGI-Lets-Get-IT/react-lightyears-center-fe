# Stage 1: Build the React app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# Stage 2: Serve through Nginx
FROM nginx:stable-alpine AS production

# Remove default Nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx config
COPY nginx.production.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]