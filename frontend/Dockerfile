# Build stage
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Development stage
FROM node:20-alpine as dev
WORKDIR /app
COPY --from=build /app /app
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# Production stage
FROM nginx:alpine as prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
