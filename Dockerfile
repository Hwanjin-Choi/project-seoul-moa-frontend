# Step 1: React Build with Node 20
FROM node:20 AS builder
WORKDIR /app
COPY . .

# 명시적으로 production 환경
ENV NODE_ENV=production

# React는 .env만 읽으므로 복사 필요
RUN cp .env.production .env

RUN npm install
RUN npm run build

# Step 2: Nginx Serve
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 3001
CMD ["nginx", "-g", "daemon off;"]