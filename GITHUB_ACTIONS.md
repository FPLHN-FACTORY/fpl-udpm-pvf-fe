# GitHub Actions - Auto Deploy to Vercel

## Setup

### 1. Lấy Vercel Token

1. Truy cập: https://vercel.com/account/tokens
2. Click "Create Token"
3. Đặt tên: `GitHub Actions Deploy`
4. Copy token (chỉ hiện 1 lần)

### 2. Thêm Secret vào GitHub

1. Vào repository GitHub: https://github.com/FPLHN-FACTORY/fpl-udpm-pvf-fe
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Thêm secret:
   - Name: `VERCEL_TOKEN`
   - Value: [paste token từ bước 1]

### 3. Lấy Vercel Project Info (Nếu cần)

Nếu workflow cần thêm thông tin project:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Lấy project ID và org ID từ .vercel/project.json
```

Thêm vào GitHub Secrets:
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Cách hoạt động

Workflow sẽ tự động chạy khi:
- Push code lên branch `main`
- Tạo Pull Request vào branch `main`

### Các bước workflow thực hiện:

1. **Checkout code**: Lấy code mới nhất
2. **Setup Node.js**: Cài đặt Node.js 20
3. **Install Vercel CLI**: Cài đặt Vercel CLI
4. **Pull Vercel Environment**: Lấy config từ Vercel
5. **Build Project**: Build production
6. **Deploy**: Deploy lên Vercel

## Kiểm tra Deploy

1. Vào tab "Actions" trên GitHub
2. Xem workflow đang chạy
3. Click vào workflow để xem chi tiết
4. Nếu thành công, sẽ có link deploy ở cuối log

## Troubleshooting

### Workflow failed

**Lỗi: "Error: Invalid token"**
- Kiểm tra lại `VERCEL_TOKEN` trong GitHub Secrets
- Token có thể đã hết hạn, tạo token mới

**Lỗi: "Error: Project not found"**
- Chạy `vercel link` để link project
- Thêm `VERCEL_PROJECT_ID` và `VERCEL_ORG_ID` vào GitHub Secrets

**Lỗi: "Build failed"**
- Kiểm tra logs để xem lỗi build
- Test build local: `npm run build`

### Disable auto deploy

Nếu muốn tắt auto deploy tạm thời:
1. Vào `.github/workflows/deploy-vercel.yml`
2. Comment hoặc xóa file
3. Commit và push

## Manual Deploy (Backup)

Nếu GitHub Actions có vấn đề, vẫn có thể deploy thủ công:

```bash
# Windows
deploy.bat

# Linux/Mac
./deploy.sh
```
