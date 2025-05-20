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

FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve through Nginx
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80