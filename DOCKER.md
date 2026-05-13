# Docker Setup Guide

## 1. Build Docker Image

```bash
# Build image
docker build -t pvf-frontend:latest .

# Hoặc với tag cụ thể
docker build -t pvf-frontend:1.0.0 .
```

## 2. Run Container

```bash
# Run container đơn lẻ
docker run -d -p 3000:80 --name pvf-fe pvf-frontend:latest

# Truy cập: http://localhost:3000
```

## 3. Docker Compose (Cho Team Backend)

Team Backend có thể thêm frontend vào docker-compose.yml của họ:

```yaml
services:
  frontend:
    image: pvf-frontend:latest
    # Hoặc build từ source
    # build:
    #   context: ./frontend
    #   dockerfile: Dockerfile
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    networks:
      - app-network

  backend:
    # Backend config của team backend
    ...
```

Chạy toàn bộ stack:
```bash
docker-compose up -d
```

## 4. Environment Variables

Nếu cần config API URL hoặc biến môi trường khác, tạo file `.env`:

```env
VITE_API_URL=http://localhost:8080/api
```

Và mount vào container:
```yaml
services:
  frontend:
    image: pvf-frontend:latest
    volumes:
      - ./.env:/app/.env
    ...
```

## 5. Push to Docker Registry (Optional)

```bash
# Tag image
docker tag pvf-frontend:latest your-registry/pvf-frontend:latest

# Push to registry
docker push your-registry/pvf-frontend:latest
```

## Troubleshooting

### Container không start
```bash
# Check logs
docker logs pvf-fe

# Check container status
docker ps -a
```

### Rebuild image sau khi có code mới
```bash
# Stop và remove container cũ
docker stop pvf-fe
docker rm pvf-fe

# Rebuild image
docker build -t pvf-frontend:latest .

# Run lại
docker run -d -p 3000:80 --name pvf-fe pvf-frontend:latest
```
