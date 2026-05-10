# Hướng dẫn Deploy lên Vercel

## Phương pháp 1: Deploy qua Vercel Dashboard (Khuyến nghị)

### Bước 1: Đẩy code lên GitHub
```bash
# Nếu chưa có git repository
git init
git add .
git commit -m "Ready for deployment"

# Tạo repository mới trên GitHub và đẩy code lên
git remote add origin https://github.com/username/repo-name.git
git branch -M main
git push -u origin main
```

### Bước 2: Import vào Vercel
1. Truy cập https://vercel.com
2. Đăng nhập bằng GitHub account
3. Click **"Add New Project"**
4. Click **"Import Git Repository"**
5. Chọn repository của bạn từ danh sách
6. Click **"Import"**

### Bước 3: Cấu hình Project
Vercel sẽ tự động phát hiện Vite framework. Kiểm tra các cài đặt:

**Build & Development Settings:**
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Root Directory:** `.` (để trống nếu project ở root)

### Bước 4: Environment Variables (Nếu cần)
Nếu dự án có biến môi trường (API keys, URLs...):

1. Trong phần **"Environment Variables"**
2. Thêm các biến:
   ```
   VITE_API_URL=https://api.example.com
   VITE_APP_NAME=PVF Management
   ```

### Bước 5: Deploy
1. Click **"Deploy"**
2. Đợi 2-3 phút để Vercel build và deploy
3. Sau khi hoàn thành, bạn sẽ nhận được URL: `https://your-project.vercel.app`

---

## Phương pháp 2: Deploy qua Vercel CLI

### Bước 1: Cài đặt Vercel CLI
```bash
npm install -g vercel
```

### Bước 2: Login vào Vercel
```bash
vercel login
```

### Bước 3: Deploy
```bash
# Deploy lần đầu (production)
vercel --prod

# Hoặc deploy preview
vercel
```

### Bước 4: Theo dõi quá trình deploy
CLI sẽ hỏi một số câu hỏi:
- Set up and deploy? **Y**
- Which scope? Chọn account của bạn
- Link to existing project? **N** (lần đầu)
- What's your project's name? Nhập tên project
- In which directory is your code located? **./** (Enter)

Vercel sẽ tự động:
1. Phát hiện Vite framework
2. Build project
3. Deploy lên production
4. Trả về URL

---

## Phương pháp 3: Deploy từ Local (Không cần GitHub)

### Bước 1: Build project locally
```bash
npm run build
```

### Bước 2: Deploy thư mục dist
```bash
vercel --prod
```

---

## Cấu hình Routing cho SPA

File `vercel.json` đã được tạo với cấu hình:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Cấu hình này đảm bảo Vue Router hoạt động đúng với history mode.

---

## Cập nhật sau khi Deploy

### Auto Deploy (Khuyến nghị)
Sau khi import từ GitHub, mỗi khi push code mới:
```bash
git add .
git commit -m "Update features"
git push origin main
```
Vercel sẽ tự động build và deploy.

### Manual Deploy qua CLI
```bash
vercel --prod
```

---

## Custom Domain (Tùy chọn)

### Bước 1: Vào Project Settings
1. Truy cập https://vercel.com/dashboard
2. Chọn project
3. Vào tab **"Settings"** → **"Domains"**

### Bước 2: Thêm Domain
1. Click **"Add"**
2. Nhập domain của bạn: `pvf.example.com`
3. Click **"Add"**

### Bước 3: Cấu hình DNS
Vercel sẽ cung cấp DNS records:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Thêm các records này vào DNS provider của bạn (GoDaddy, Cloudflare, etc.)

---

## Environment Variables cho Production

### Tạo file .env.production (Local)
```env
VITE_API_URL=https://api.production.com
VITE_APP_NAME=PVF Management System
```

### Thêm vào Vercel Dashboard
1. Project Settings → Environment Variables
2. Thêm từng biến:
   - Key: `VITE_API_URL`
   - Value: `https://api.production.com`
   - Environment: **Production**

### Sử dụng trong code
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Troubleshooting

### Lỗi: Build failed
**Nguyên nhân:** Dependencies thiếu hoặc lỗi TypeScript

**Giải pháp:**
```bash
# Test build locally trước
npm run build

# Kiểm tra lỗi TypeScript
npm run type-check
```

### Lỗi: 404 khi refresh page
**Nguyên nhân:** Thiếu cấu hình rewrites

**Giải pháp:** Đảm bảo file `vercel.json` có rewrites config

### Lỗi: Environment variables không hoạt động
**Nguyên nhân:** Biến không có prefix `VITE_`

**Giải pháp:** Đổi tên biến:
```
❌ API_URL=...
✅ VITE_API_URL=...
```

### Lỗi: Build quá lâu
**Nguyên nhân:** node_modules quá lớn

**Giải pháp:** Thêm `.vercelignore`:
```
node_modules
.git
*.log
```

---

## Monitoring & Analytics

### Bật Analytics
1. Project Settings → Analytics
2. Enable Web Analytics
3. Xem metrics: Page views, Performance, etc.

### Xem Build Logs
1. Deployments tab
2. Click vào deployment
3. Xem **"Building"** logs để debug

---

## Best Practices

### 1. Sử dụng Environment Variables
Không hardcode API URLs, keys trong code:
```typescript
// ❌ Bad
const API_URL = 'https://api.example.com'

// ✅ Good
const API_URL = import.meta.env.VITE_API_URL
```

### 2. Optimize Build Size
```bash
# Analyze bundle size
npm run build -- --mode production

# Sử dụng lazy loading cho routes
const Home = () => import('./pages/Home.vue')
```

### 3. Enable Caching
Vercel tự động cache static assets. Đảm bảo:
- Images trong `/public` folder
- Fonts, icons được optimize

### 4. Preview Deployments
Mỗi branch/PR tự động tạo preview URL:
```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
```
Vercel tạo URL: `https://your-project-git-feature-new-feature.vercel.app`

---

## Giá & Limits (Free Plan)

- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Preview deployments
- ⚠️ Build time: 6000 minutes/month
- ⚠️ Serverless function execution: 100GB-hours

---

## Liên kết hữu ích

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- Vite Deployment Guide: https://vitejs.dev/guide/static-deploy.html
- Support: https://vercel.com/support

---

## Checklist trước khi Deploy

- [ ] Code đã được test kỹ
- [ ] `npm run build` chạy thành công
- [ ] Environment variables đã được cấu hình
- [ ] `.gitignore` đã loại trừ `node_modules`, `.env`
- [ ] `vercel.json` đã được tạo
- [ ] Code đã được push lên GitHub
- [ ] API endpoints đã được cấu hình đúng

---

## Kết luận

Deploy lên Vercel rất đơn giản với Vite. Phương pháp khuyến nghị:
1. Push code lên GitHub
2. Import vào Vercel
3. Để Vercel tự động deploy mỗi khi push

Chúc bạn deploy thành công! 🚀
