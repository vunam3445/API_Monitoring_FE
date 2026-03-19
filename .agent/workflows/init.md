---
description: Khởi tạo workspace - Tổng quan dự án và chuẩn bị môi trường phát triển
---

# Workflow: Khởi tạo Workspace (`/init`)

## Mục đích
Workflow này được sử dụng để khởi tạo workspace, tìm hiểu tổng quan dự án, và chuẩn bị môi trường phát triển.

## Các bước thực hiện

### 1. Kiểm tra cấu trúc dự án
- Đọc `package.json` để xác định dependencies và scripts
- Đọc `vite.config.js` để hiểu cấu hình build
- Đọc `.env` để xem biến môi trường
- Kiểm tra cấu trúc thư mục `src/`

### 2. Tổng quan kiến trúc
- Đọc `src/App.jsx` để hiểu routing
- Đọc `src/main.jsx` để hiểu entry point
- Kiểm tra `src/services/apiClient.js` để hiểu cơ chế xác thực và HTTP client
- Liệt kê các pages, components, hooks, services, utils hiện có

### 3. Tạo / Cập nhật tài liệu tổng quan
- Tạo artifact `project_overview.md` tóm tắt toàn bộ dự án

### 4. Kiểm tra trạng thái chạy
// turbo
- Chạy `npm run dev` để đảm bảo project hoạt động bình thường (nếu chưa chạy)

## Nguyên tắc phát triển

- **Clean Architecture**: Tách biệt rõ ràng giữa layers (UI, Business Logic, Data)
- **SOLID Principles**: Đặc biệt SRP cho components và hooks
- **Luôn trả lời bằng tiếng Việt**
