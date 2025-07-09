# Stage 1: Build the Angular app
FROM node:18 AS builder
WORKDIR /app

# Copy ONLY package files first
COPY package.json ./

RUN npm install --force
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/angular-app/browser /usr/share/nginx/html

# Optional: Replace default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
