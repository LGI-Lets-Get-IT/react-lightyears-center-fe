# FROM node:20-alpine AS build
# # Set the working directory
# WORKDIR /app
# # Copy the package.json and package-lock.json files
# COPY package*.json ./
# # Install the dependencies
# RUN npm install
# # Copy the app files
# COPY . .
# # Build the app
# RUN npm run build
# # Expose the port
# EXPOSE 3000
# # Run the app
# CMD ["npm", "run", "dev"]

# Stage 1: Build the React app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve through Nginx
FROM nginx:stable-alpine AS production

# Remove default Nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]