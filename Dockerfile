# FROM node:20-alpine AS build
# Set the working directory
# WORKDIR /app
# # Copy the package.json and package-lock.json files
# COPY package*.json ./

# RUN npm uninstall
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

FROM node:18-alpine AS build

WORKDIR /app

COPY package.json .

RUN npm install -g npm@11.3.0
RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]