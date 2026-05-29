# Kế hoạch triển khai: Hệ thống Quản lý Tính năng động của Admin (Admin Features Management)

> **Dành cho các tác nhân AI (Agentic Workers):** REQUIRED SUB-SKILL: Sử dụng `superpowers:subagent-driven-development` hoặc `superpowers:executing-plans` để thực thi kế hoạch này theo từng tác vụ. Các bước sử dụng cú pháp checkbox (`- [ ]`) để theo dõi tiến độ.

**Mục tiêu:** Xây dựng một tab giao diện mới cho phép Admin quản lý các tính năng (Features) phẳng dưới dạng in-memory mock. Tích hợp danh sách tính năng động này vào Modal Tạo/Sửa Pricing Plan của Admin thay vì fix cứng.

**Kiến trúc:** Clean Architecture & SOLID:
- **Tầng dữ liệu (Service Layer):** Đóng gói logic CRUD trong `featureService.js` thao tác với mảng in-memory.
- **Tầng giao diện (Presentation Layer):** Tách biệt trang chính `AdminFeatures.jsx` khỏi các component giao diện con (`FeatureTable.jsx`, `CreateFeatureModal.jsx`).
- **Tích hợp:** Modal tạo Plan cập nhật danh sách chọn động bằng cách truy vấn dữ liệu thông qua service.

**Công nghệ sử dụng:** React, TailwindCSS, React Router DOM, Material Symbols.

---

### Tác vụ 1: Xây dựng Feature Mock Service

**Tệp tin:**
- Tạo mới: `src/services/featureService.js`

- [ ] **Bước 1: Viết mã nguồn cho `featureService.js`**

Tạo mới file `src/services/featureService.js` để quản lý mảng in-memory `MOCK_FEATURES` và xuất ra các hàm CRUD cơ bản:

```javascript
// src/services/featureService.js

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
    getAll: () => {
        return [...MOCK_FEATURES];
    },

    create: (feature) => {
        const exists = MOCK_FEATURES.some(f => f.key === feature.key);
        if (exists) {
            throw new Error(`Mã tính năng (key) "${feature.key}" đã tồn tại!`);
        }
        const newFeature = {
            key: feature.key.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_'),
            label: feature.label.trim(),
            description: feature.description.trim()
        };
        MOCK_FEATURES.push(newFeature);
        return newFeature;
    },

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

    delete: (key) => {
        const initialLength = MOCK_FEATURES.length;
        MOCK_FEATURES = MOCK_FEATURES.filter(f => f.key !== key);
        return MOCK_FEATURES.length < initialLength;
    }
};
```

- [ ] **Bước 2: Xác nhận tệp tin đã tạo thành công và cấu trúc chính xác**

Kiểm tra cú pháp JS của file bằng cách import thử hoặc chạy build.

- [ ] **Bước 3: Thực hiện Commit (nếu auto_commit được bật)**

Kiểm tra `.agent/config.yml` xem `auto_commit` được bật hay không. Nếu `auto_commit: false`, bỏ qua bước này. Nếu `auto_commit: true`:
```bash
git add src/services/featureService.js
git commit -m "feat: add feature mock service for admin dynamic features"
```

---

### Tác vụ 2: Tích hợp Định tuyến Route & Sidebar Menu

**Tệp tin:**
- Chỉnh sửa: `src/App.jsx`
- Chỉnh sửa: `src/pages/admin/layout/AdminSidebar.jsx`

- [ ] **Bước 1: Cập nhật `src/App.jsx` để đăng ký Route mới**

Import trang `AdminFeatures` (sẽ tạo ở tác vụ sau) và thêm định tuyến đường dẫn `/admin/features`.

Tìm vị trí route `/admin/pricing-plans` (khoảng dòng 50):
```diff
                 <Route path="/admin/alerts" element={<AdminAlerts />} />
                 <Route path="/admin/pricing-plans" element={<AdminPricingPlans />} />
+                <Route path="/admin/features" element={<AdminFeatures />} />
```
*(Hãy thêm import `AdminFeatures` ở đầu tệp `src/App.jsx`)*:
```diff
 import AdminPricingPlans from './pages/admin/pages/AdminPricingPlans/AdminPricingPlans';
+import AdminFeatures from './pages/admin/pages/AdminFeatures/AdminFeatures';
```

- [ ] **Bước 2: Thêm menu item vào `src/pages/admin/layout/AdminSidebar.jsx`**

Thêm thẻ `NavLink` điều hướng đến trang quản lý tính năng. 

Tìm vị trí hiển thị "Pricing Plans" (khoảng dòng 46):
```diff
                 <NavLink to="/admin/pricing-plans" className={navItemClass}>
                     <span className="material-symbols-outlined">payments</span>
                     <span>Pricing Plans</span>
                 </NavLink>
+                <NavLink to="/admin/features" className={navItemClass}>
+                    <span className="material-symbols-outlined">extension</span>
+                    <span>Features</span>
+                </NavLink>
```

- [ ] **Bước 3: Thực hiện Commit (nếu auto_commit được bật)**

Kiểm tra cài đặt `auto_commit` trong `.agent/config.yml`. Nếu `true`:
```bash
git add src/App.jsx src/pages/admin/layout/AdminSidebar.jsx
git commit -m "feat: integrate admin features route and sidebar link"
```

---

### Tác vụ 3: Phát triển trang quản lý AdminFeatures

**Tệp tin:**
- Tạo mới: `src/pages/admin/pages/AdminFeatures/AdminFeatures.jsx`
- Tạo mới: `src/pages/admin/pages/AdminFeatures/components/FeatureTable.jsx`
- Tạo mới: `src/pages/admin/pages/AdminFeatures/components/CreateFeatureModal.jsx`

- [ ] **Bước 1: Tạo Component `FeatureTable.jsx`**

Tạo mới tệp `src/pages/admin/pages/AdminFeatures/components/FeatureTable.jsx` để hiển thị danh sách phẳng các features:

```jsx
import React from 'react';

const FeatureTable = ({ features, loading, onEdit, onDelete }) => {
    if (loading) {
        return (
            <div className="w-full flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (features.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700">extension</span>
                <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">Chưa có tính năng nào được tạo.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                            <th className="px-6 py-4">Mã Tính Năng (Key)</th>
                            <th className="px-6 py-4">Tên Tính Năng</th>
                            <th className="px-6 py-4">Mô Tả</th>
                            <th className="px-6 py-4 text-right">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {features.map((feature) => (
                            <tr key={feature.key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
                                    {feature.key}
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-slate-200">
                                    {feature.label}
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 max-w-md break-words">
                                    {feature.description}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(feature)}
                                            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-colors"
                                            title="Sửa"
                                        >
                                            <span className="material-symbols-outlined text-lg">edit</span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(feature)}
                                            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-rose-600 transition-colors"
                                            title="Xoá"
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeatureTable;
```

- [ ] **Bước 2: Tạo Component `CreateFeatureModal.jsx`**

Tạo mới tệp `src/pages/admin/pages/AdminFeatures/components/CreateFeatureModal.jsx` để hiển thị Modal form nhập dữ liệu:

```jsx
import React, { useState, useEffect } from 'react';

const CreateFeatureModal = ({ isOpen, onClose, onSubmit, editFeature = null, existingFeatures = [] }) => {
    const [formData, setFormData] = useState({ key: '', label: '', description: '' });
    const [error, setError] = useState('');
    const isEditMode = !!editFeature;

    useEffect(() => {
        if (isOpen) {
            if (editFeature) {
                setFormData({ ...editFeature });
            } else {
                setFormData({ key: '', label: '', description: '' });
            }
            setError('');
        }
    }, [isOpen, editFeature]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'key' ? value.toLowerCase().replace(/[^a-z0-9_]/g, '_') : value,
        }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.key.trim()) {
            setError('Mã tính năng không được để trống.');
            return;
        }
        if (!formData.label.trim()) {
            setError('Tên tính năng không được để trống.');
            return;
        }

        // Kiểm tra trùng lặp key (chỉ kiểm tra khi tạo mới)
        if (!isEditMode) {
            const isDuplicate = existingFeatures.some(f => f.key === formData.key.trim().toLowerCase());
            if (isDuplicate) {
                setError('Mã tính năng này đã tồn tại.');
                return;
            }
        }

        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl transition-all border border-slate-200 dark:border-slate-800">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {isEditMode ? 'Chỉnh sửa tính năng' : 'Thêm tính năng mới'}
                    </h3>
                    <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Body */}
                    <div className="p-6 space-y-4">
                        {error && (
                            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">error</span>
                                {error}
                            </div>
                        )}

                        {/* Feature Key */}
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">
                                Mã tính năng (Key) <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="key"
                                value={formData.key}
                                onChange={handleChange}
                                disabled={isEditMode}
                                className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                                placeholder="e.g. email_notifications"
                            />
                            {!isEditMode && <p className="mt-1 text-[10px] text-slate-400">Chỉ dùng chữ thường không dấu, số và dấu gạch dưới (_).</p>}
                        </div>

                        {/* Feature Label */}
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">
                                Tên tính năng (Label) <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="label"
                                value={formData.label}
                                onChange={handleChange}
                                className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                                placeholder="e.g. Email Notifications"
                            />
                        </div>

                        {/* Feature Description */}
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">Mô tả</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
                                placeholder="Mô tả tóm tắt tính năng..."
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3 bg-slate-50/50 dark:bg-slate-800/30">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm">
                            Huỷ
                        </button>
                        <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-xl font-semibold flex items-center gap-1 shadow-lg shadow-primary/20 transition-all text-sm">
                            <span className="material-symbols-outlined text-sm">save</span>
                            {isEditMode ? 'Lưu thay đổi' : 'Thêm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFeatureModal;
```

- [ ] **Bước 3: Tạo Trang chính `AdminFeatures.jsx`**

Tạo mới tệp `src/pages/admin/pages/AdminFeatures/AdminFeatures.jsx` kết nối UI với `featureService`:

```jsx
import React, { useState, useEffect } from 'react';
import { featureService } from '../../../../services/featureService';
import FeatureTable from './components/FeatureTable';
import CreateFeatureModal from './components/CreateFeatureModal';
import { useToast } from '../../../../components/UI/Toast';
import { useConfirmDialog } from '../../../../components/UI/ConfirmDialog';

const AdminFeatures = () => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editFeature, setEditFeature] = useState(null);

    const toast = useToast();
    const { confirm } = useConfirmDialog();

    const loadFeatures = () => {
        setLoading(true);
        try {
            const data = featureService.getAll();
            setFeatures(data);
        } catch (err) {
            toast.error('Lỗi khi tải danh sách tính năng');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFeatures();
    }, []);

    const handleCreateOpen = () => {
        setEditFeature(null);
        setIsModalOpen(true);
    };

    const handleEditOpen = (feature) => {
        setEditFeature(feature);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditFeature(null);
    };

    const handleSubmitModal = (formData) => {
        try {
            if (editFeature) {
                featureService.update(editFeature.key, formData);
                toast.success('Cập nhật tính năng thành công!');
            } else {
                featureService.create(formData);
                toast.success('Thêm tính năng mới thành công!');
            }
            loadFeatures();
            handleCloseModal();
        } catch (err) {
            toast.error(err.message || 'Thao tác thất bại.');
        }
    };

    const handleDeleteFeature = async (feature) => {
        const confirmed = await confirm({
            title: 'Xoá Tính Năng',
            message: `Bạn có chắc chắn muốn xoá tính năng "${feature.label}"? Các Plan đang chọn tính năng này có thể bị ảnh hưởng.`,
            confirmText: 'Xoá ngay',
            cancelText: 'Huỷ',
            type: 'danger',
            icon: 'delete_forever',
        });

        if (!confirmed) return;

        try {
            const success = featureService.delete(feature.key);
            if (success) {
                toast.success('Đã xoá tính năng thành công!');
                loadFeatures();
            } else {
                toast.error('Không thể xoá tính năng.');
            }
        } catch (err) {
            toast.error('Có lỗi xảy ra khi xoá tính năng.');
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-background-light dark:bg-background-dark h-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <span>Admin</span>
                        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                        <span>Features</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
                        Features Management
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                        Quản lý các tính năng độc lập trong hệ thống để chọn khi thiết lập gói cước (Pricing Plans).
                    </p>
                </div>
                <div>
                    <button
                        onClick={handleCreateOpen}
                        className="px-4 py-2 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm"
                    >
                        <span className="material-symbols-outlined text-lg">add_circle</span>
                        Create New Feature
                    </button>
                </div>
            </div>

            {/* Table */}
            <FeatureTable
                features={features}
                loading={loading}
                onEdit={handleEditOpen}
                onDelete={handleDeleteFeature}
            />

            {/* Modal Form */}
            <CreateFeatureModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitModal}
                editFeature={editFeature}
                existingFeatures={features}
            />
        </div>
    );
};

export default AdminFeatures;
```

- [ ] **Bước 4: Thực hiện Commit (nếu auto_commit được bật)**

Kiểm tra cài đặt `auto_commit` trong `.agent/config.yml`. Nếu `true`:
```bash
git add src/pages/admin/pages/AdminFeatures/
git commit -m "feat: build AdminFeatures CRUD management UI and components"
```

---

### Tác vụ 4: Cập nhật Pricing Plan Modal tích hợp dynamic features

**Tệp tin:**
- Chỉnh sửa: `src/pages/admin/pages/AdminPricingPlans/components/CreateSubscriptionPlanModal.jsx`

- [ ] **Bước 1: Chỉnh sửa `CreateSubscriptionPlanModal.jsx` để load dynamic features**

Mở tệp `src/pages/admin/pages/AdminPricingPlans/components/CreateSubscriptionPlanModal.jsx`. 

1. **Import `featureService`** ở đầu tệp (khoảng dòng 2):
```diff
 import React, { useState, useEffect, useRef } from 'react';
+import { featureService } from '../../../../services/featureService';
```

2. **Xoá hằng số fix cứng `AVAILABLE_FEATURES`** (dòng 10-79) và thay vào đó là quản lý state động các features trong Modal.

3. **Cập nhật state và useEffect trong Modal**:
Thêm state để lưu danh sách features động nhận từ service:
```javascript
// Bên trong component CreateSubscriptionPlanModal (khoảng dòng 186):
const [dynamicFeatures, setDynamicFeatures] = useState([]);
```
Cập nhật `useEffect` lúc Modal được mở (khoảng dòng 202-213) để tải dữ liệu động:
```javascript
    useEffect(() => {
        if (isOpen) {
            // Tải danh sách tính năng động từ service
            const fetchedFeatures = featureService.getAll();
            setDynamicFeatures(fetchedFeatures);

            if (editPlan) {
                setFormData(planToFormData(editPlan));
            } else {
                setFormData(getInitialFormData());
            }
            setErrors({});
            setActiveStep(0);
            setIsSubmitting(false);
        }
    }, [isOpen, editPlan]);
```

4. **Cập nhật hàm `renderStep1` để hiển thị danh sách phẳng** (dòng 424-522):
Loại bỏ hàm con `renderFeatureGroup` và tab chia nhóm. Thay đổi giao diện thành render danh sách checkbox phẳng trực quan:

```jsx
    const renderStep1 = () => {
        return (
            <div className="space-y-6 animate-fadeIn pb-4">
                {/* Section Giới hạn */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] font-black uppercase text-slate-400 mb-2 tracking-widest">Giới hạn Monitors</label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary transition-colors">dns</span>
                            <input
                                type="number"
                                name="maxMonitors"
                                value={formData.maxMonitors}
                                onChange={handleChange}
                                min="1"
                                className={`block w-full rounded-xl border ${errors.maxMonitors ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary/20'} bg-white dark:bg-slate-800 py-2.5 pl-11 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all text-sm`}
                                placeholder="e.g. 50"
                            />
                        </div>
                        {errors.maxMonitors && <p className="mt-1 text-xs text-rose-500">{errors.maxMonitors}</p>}
                    </div>
                    <div>
                        <label className="block text-[11px] font-black uppercase text-slate-400 mb-2 tracking-widest">Tần suất tối thiểu</label>
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary transition-colors">timer</span>
                            <select
                                name="minInterval"
                                value={formData.minInterval}
                                onChange={handleChange}
                                className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 pl-11 pr-4 text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm appearance-none"
                            >
                                {INTERVAL_OPTIONS.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Danh sách Features dạng phẳng động */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Tính năng đi kèm</label>
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{selectedFeaturesCount} Tính năng được chọn</span>
                    </div>

                    {dynamicFeatures.length === 0 ? (
                        <div className="text-center py-6 text-slate-400 text-xs">
                            <span className="material-symbols-outlined text-lg mb-1 block">extension_off</span>
                            Chưa có tính năng nào khả dụng trong hệ thống.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                            {dynamicFeatures.map((feature) => {
                                const isChecked = !!(formData.features && formData.features[feature.key]);
                                return (
                                    <button
                                        key={feature.key}
                                        type="button"
                                        onClick={() => handleFeatureToggle(feature.key)}
                                        className={`flex items-start gap-3 p-3 rounded-xl transition-all border text-left ${isChecked
                                            ? 'bg-primary/5 border-primary/30 dark:bg-primary/10 ring-1 ring-primary/20'
                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                            }`}
                                    >
                                        <div className="mt-0.5 shrink-0">
                                            <span className={`material-symbols-outlined text-lg transition-colors ${isChecked ? 'text-primary' : 'text-slate-300'}`}>
                                                {isChecked ? 'check_circle' : 'radio_button_unchecked'}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-xs font-bold truncate ${isChecked ? 'text-primary' : 'text-slate-700 dark:text-slate-200'}`}>
                                                {feature.label}
                                            </p>
                                            <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    };
```

5. **Cập nhật hàm `renderStep2` để hiển thị xem lại các tính năng động tương ứng** (dòng 524-582):
Lấy các feature được chọn từ danh sách `dynamicFeatures` thay vì hằng số static cũ:
```javascript
        const selectedFeatures = dynamicFeatures.filter((f) => formData.features[f.key]);
```

- [ ] **Bước 2: Thực hiện Commit (nếu auto_commit được bật)**

Kiểm tra cài đặt `auto_commit` trong `.agent/config.yml`. Nếu `true`:
```bash
git add src/pages/admin/pages/AdminPricingPlans/components/CreateSubscriptionPlanModal.jsx
git commit -m "feat: integrate dynamic features selection in CreateSubscriptionPlanModal"
```

---

### Tác vụ 5: Khởi chạy và Xác thực Tính năng

- [ ] **Bước 1: Xác thực giao diện và hoạt động CRUD trên trang Features**
  - Chuyển hướng trình duyệt đến `/admin/features`.
  - Tạo mới feature có key `advanced_reporting`, label `Advanced PDF Reports`, description `Tải báo cáo định kỳ dạng file PDF.`.
  - Kiểm tra xem dòng mới có xuất hiện trong bảng không.
  - Sửa feature vừa tạo thành công.

- [ ] **Bước 2: Xác thực tính năng động hiển thị trong Modal Plan**
  - Di chuyển đến trang `/admin/pricing-plans`.
  - Bấm "Create New Plan" -> Điền thông tin cơ bản -> Tiến đến Bước 2.
  - Xác nhận checkbox `Advanced PDF Reports` xuất hiện động trong danh sách và cho phép click chọn thành công.
