# Hướng dẫn Deploy Dashboard lên bi.savvygo.vn

## Cách nhanh nhất: Deploy qua Vercel (miễn phí)

### Bước 1: Tạo tài khoản Vercel
- Truy cập https://vercel.com → Sign Up bằng GitHub hoặc email

### Bước 2: Upload project
- Tạo repository mới trên GitHub (đặt tên: `savvy-bi-dashboard`)
- Upload toàn bộ thư mục `bi-savvygo/` vào repository:
  - index.html
  - sales-2025.html
  - hr-dashboard.html
  - tong-hop-2025-2026.html

### Bước 3: Deploy trên Vercel
- Vào Vercel Dashboard → "New Project"
- Import repository GitHub vừa tạo
- Nhấn "Deploy" — Vercel sẽ tự động deploy
- Bạn sẽ nhận được link dạng: `savvy-bi-dashboard.vercel.app`

### Bước 4: Cấu hình subdomain bi.savvygo.vn trên Mắt Bão

1. Đăng nhập https://matbao.net → Quản lý tên miền → savvygo.vn
2. Vào phần **Quản lý DNS**
3. Thêm bản ghi CNAME mới:
   - **Tên (Host):** `bi`
   - **Loại:** CNAME
   - **Giá trị (Value):** `cname.vercel-dns.com`
   - **TTL:** 3600

4. Quay lại Vercel Dashboard:
   - Vào project → Settings → Domains
   - Thêm domain: `bi.savvygo.vn`
   - Vercel sẽ tự động cấp SSL (HTTPS)

5. Chờ 5-30 phút để DNS cập nhật → truy cập https://bi.savvygo.vn

---

## Cách 2: Deploy qua Netlify (miễn phí, kéo thả)

### Bước 1:
- Truy cập https://app.netlify.com/drop
- **Kéo thả** toàn bộ thư mục `bi-savvygo/` vào trang

### Bước 2:
- Netlify sẽ tự động deploy và cấp link

### Bước 3: Cấu hình DNS tại Mắt Bão
- Thêm CNAME record:
  - Host: `bi`
  - Value: `[your-site-name].netlify.app`

---

## Thông tin đăng nhập Dashboard
- **Mật khẩu:** savvy2026
- Đây chỉ là bảo vệ cơ bản bằng JavaScript
- Để bảo mật cao hơn, nên cài thêm Vercel Password Protection (có phí)

---

## Cập nhật dữ liệu
- Mỗi khi có dữ liệu mới, chỉ cần cập nhật các file HTML và push lại lên GitHub
- Vercel sẽ tự động re-deploy trong vòng 30 giây
