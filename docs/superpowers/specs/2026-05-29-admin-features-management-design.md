# Đặc tả thiết kế: Hệ thống Quản lý Tính năng động của Admin (Admin Features Management)

**Mục tiêu:** Xây dựng một tab giao diện mới cho phép Admin quản lý (CRUD) các tính năng (Features) của nền tảng dưới dạng danh sách phẳng tĩnh (in-memory mock). Sau đó, tích hợp danh sách động này vào Modal Tạo/Sửa Subscription Plan để Admin chọn trực tiếp thay vì sử dụng danh sách fix cứng như hiện nay.

**Kiến trúc:** Tuân thủ mô hình Clean Architecture và các nguyên lý SOLID:
- Tách biệt tầng Lưu trữ & Xử lý logic dữ liệu (Service Layer: `featureService.js`) khỏi tầng Hiển thị (Presentation Layer: Components UI).
- Sử dụng cơ chế in-memory module của ES để cache và chia sẻ dữ liệu tức thời giữa các trang admin mà không làm mất dữ liệu khi chuyển tab (chỉ reset khi nhấn F5 tải lại trang).
- Giao diện Admin đồng bộ hóa với phong cách hiện tại sử dụng Vanilla CSS + TailwindCSS, hỗ trợ chế độ tối (dark mode) mặc định.

**Công nghệ sử dụng:** React 18, React Router DOM, TailwindCSS, Material Symbols.

---

## 1. Cấu trúc dữ liệu & Lưu trữ (Data & Service Layer)

### Tệp mới: `src/services/featureService.js`
Tệp này đóng vai trò quản lý danh sách tính năng trong bộ nhớ (in-memory) và cung cấp các hàm API giả lập (mock APIs) để tầng UI gọi tới.

```javascript
// src/services/featureService.js

// Khởi tạo danh sách mặc định (dạng danh sách phẳng)
let MOCK_FEATURES = [
    {
        key: '5_api_endpoints',
        label: '5 API Endpoints',
        description: 'Giới hạn tối đa 5 địa chỉ API được theo dõi đồng thời.'
    },
    {
        key: '50_api_endpoints',
        label: '50 API Endpoints',
        description: 'Mở rộng khả năng giám sát lên đến 50 API.'
    },
    {
        key: 'email_notifications',
        label: 'Email Notifications',
        description: 'Gửi thông báo lỗi trực tiếp vào hòm thư cá nhân.'
    },
    {
        key: 'slack_notifications',
        label: 'Slack & Webhook Support',
        description: 'Tích hợp thông báo vào Slack hoặc gửi dữ liệu lỗi đến URL tùy chỉnh.'
    },
    {
        key: 'advanced_analytics',
        label: '24h Performance Charts',
        description: 'Biểu đồ trực quan hóa dữ liệu hiệu năng trong 24 giờ qua.'
    },
    {
        key: 'api_response_validation',
        label: 'Deep Response Validation',
        description: 'Xác thực sâu cấu trúc JSON và kiểu dữ liệu trong phản hồi.'
    }
];

export const featureService = {
    /**
     * Lấy toàn bộ danh sách tính năng
     * @returns {Array} List of features
     */
    getAll: () => {
        return [...MOCK_FEATURES];
    },

    /**
     * Tạo mới một tính năng
     * @param {Object} feature - { key, label, description }
     * @returns {Object} Feature đã tạo
     */
    create: (feature) => {
        const exists = MOCK_FEATURES.some(f => f.key === feature.key);
        if (exists) {
            throw new Error(`Mã tính năng (key) "${feature.key}" đã tồn tại!`);
        }
        const newFeature = {
            key: feature.key.trim().toLowerCase(),
            label: feature.label.trim(),
            description: feature.description.trim()
        };
        MOCK_FEATURES.push(newFeature);
        return newFeature;
    },

    /**
     * Cập nhật một tính năng
     * @param {string} key - key của tính năng cần sửa
     * @param {Object} updatedData - { label, description } (không cho sửa key)
     * @returns {Object} Feature đã sửa
     */
    update: (key, updatedData) => {
        const index = MOCK_FEATURES.findIndex(f => f.key === key);
        if (index === -1) {
            throw new Error(`Không tìm thấy tính năng có mã "${key}"`);
        }
        MOCK_FEATURES[index] = {
            ...MOCK_FEATURES[index],
            label: updatedData.label.trim(),
            description: updatedData.description.trim()
        };
        return MOCK_FEATURES[index];
    },

    /**
     * Xóa một tính năng
     * @param {string} key - key của tính năng cần xóa
     * @returns {boolean} true nếu xóa thành công
     */
    delete: (key) => {
        const initialLength = MOCK_FEATURES.length;
        MOCK_FEATURES = MOCK_FEATURES.filter(f => f.key !== key);
        return MOCK_FEATURES.length < initialLength;
    }
};
```

---

## 2. Giao diện Người dùng (Presentation Layer)

### Thư mục mới: `src/pages/admin/pages/AdminFeatures`

Chúng ta sẽ xây dựng trang quản lý tính năng tĩnh bao gồm:
1. **`AdminFeatures.jsx`**: Page chính điều phối layout và quản lý React State (danh sách features, modal open/close, edit mode).
2. **`components/FeatureTable.jsx`**: Render danh sách phẳng các features gồm các cột: Key, Label, Description và nút sửa/xóa dưới dạng một bảng HTML hiện đại, chuẩn UI/UX của dự án.
3. **`components/CreateFeatureModal.jsx`**: Modal form cho phép thêm mới hoặc chỉnh sửa tính năng với các trường:
   - **Key**: Nhập mã duy nhất. Tự động kiểm tra trùng lặp. Vô hiệu hóa (disabled) khi ở chế độ chỉnh sửa để đảm bảo tính nhất quán dữ liệu.
   - **Label**: Nhập tên hiển thị.
   - **Description**: Nhập mô tả.

### Định tuyến & Điều hướng
- **Đăng ký Route mới** trong `src/App.jsx`:
  ```jsx
  <Route path="/admin/features" element={<AdminFeatures />} />
  ```
- **Thêm liên kết điều hướng** trong `src/pages/admin/layout/AdminSidebar.jsx`:
  Thêm mục "Features" ở phía dưới mục "Pricing Plans" với icon tương ứng (`extension` hoặc `featured_play_list`).
  ```jsx
  <NavLink to="/admin/features" className={navItemClass}>
      <span className="material-symbols-outlined">extension</span>
      <span>Features</span>
  </NavLink>
  ```

---

## 3. Tích hợp động vào Subscription Plan Modal

Chúng ta sẽ nâng cấp `CreateSubscriptionPlanModal.jsx` để:
1. **Gọi Service dynamic**: Đọc dữ liệu từ `featureService.getAll()` lúc mount component thay vì sử dụng mảng cố định `AVAILABLE_FEATURES`.
2. **Giao diện chọn dạng danh sách phẳng trực quan**:
   - Loại bỏ các tab chia nhóm (`CORE`, `NOTIFICATIONS`, `ANALYTICS`, `SECURITY`) rườm rà.
   - Render trực tiếp toàn bộ danh sách tính năng động dạng lưới (grid) 2 cột với các thẻ checkbox lớn. Admin chỉ việc click chọn.
   - Hiển thị số lượng tính năng đã chọn ở góc nhỏ bên trên bảng.
3. **Giữ nguyên định dạng đầu ra**: Khi Admin lưu Plan, danh sách tính năng được chọn vẫn được mã hóa thành JSON string gửi lên backend bình thường để đảm bảo không làm gãy API hiện có của hệ thống:
   ```javascript
   features: JSON.stringify(formData.features) // định dạng: {"5_api_endpoints": true, "email_notifications": true}
   ```

---

## 4. Kịch bản kiểm thử tĩnh (Static Testing Strategy)

Do dữ liệu được quản lý in-memory ở Client, chúng ta sẽ kiểm tra tính hoạt động của luồng tính năng như sau:
1. **Kiểm tra CRUD:**
   - Truy cập `/admin/features`, bấm "Create New Feature", điền key `test_feature`, bấm Save. Xác nhận tính năng mới xuất hiện ở bảng.
   - Bấm Sửa (Edit) tính năng đó, đổi tên và mô tả, bấm Lưu. Xác nhận thay đổi được cập nhật ngay tại bảng.
   - Thử tạo một tính năng khác trùng key `test_feature`, hệ thống phải báo lỗi trùng lặp mã.
2. **Kiểm tra tích hợp Plan Modal:**
   - Chuyển sang tab "Pricing Plans" trong Sidebar, bấm "Create New Plan".
   - Chuyển đến Bước 2 (Giới hạn & Tính năng). Xác nhận tính năng `test_feature` vừa tạo xuất hiện động trong danh sách flat list.
   - Tích chọn `test_feature` và lưu Plan.
   - Xác nhận trong Bảng Plan hiển thị chi tiết, tính năng `test_feature` được hiển thị đầy đủ.
3. **Kiểm tra xóa tính năng:**
   - Quay lại tab "Features", thực hiện xóa `test_feature`.
   - Mở lại modal tạo plan, xác nhận `test_feature` đã biến mất khỏi danh sách chọn.
