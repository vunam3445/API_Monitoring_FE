// Dịch vụ quản lý thông báo dành cho Người dùng cuối (Kết nối API Backend Spring Boot & Mock Fallback)
import { apiClient } from './apiClient';

const USER_NOTIFICATIONS_KEY = 'api_monitor_user_notifications';

// Hạt giống dữ liệu mẫu sinh động để người dùng trải nghiệm ngay lập tức (Mock Fallback)
const seedUserNotifications = [
    {
        id: 'un-1',
        title: 'Bảo trì nâng cấp hệ thống định kỳ tháng 5',
        content: 'Hệ thống API Monitoring sẽ tiến hành bảo trì nâng cấp hạ tầng định kỳ vào lúc 02:00 AM đến 04:00 AM ngày 28/05/2026. Trong thời gian này, các tính năng kiểm tra trạng thái và thống kê thời gian hoạt động của API có thể bị gián đoạn tạm thời.',
        level: 'SYSTEM',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString() // 20 phút trước
    },
    {
        id: 'un-2',
        title: 'Cảnh báo: Tần suất lỗi của API Checkout tăng cao',
        content: 'Hệ thống ghi nhận API Checkout (https://api.yourdomain.com/checkout) liên tục phản hồi mã lỗi 502 Bad Gateway trong vòng 5 phút qua. Vui lòng kiểm tra lại dịch vụ Backend của bạn.',
        level: 'WARNING',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 giờ trước
    },
    {
        id: 'un-3',
        title: 'Chào mừng bạn tham gia hệ thống API Monitoring!',
        content: 'Cảm ơn bạn đã đăng ký tài khoản trên hệ thống giám sát hiệu năng API của chúng tôi. Hãy bắt đầu thêm API endpoint đầu tiên của bạn trong thẻ "API List" để bắt đầu giám sát 24/7.',
        level: 'INFO',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 ngày trước
    }
];

const getStoredNotifications = () => {
    const data = localStorage.getItem(USER_NOTIFICATIONS_KEY);
    if (!data) {
        localStorage.setItem(USER_NOTIFICATIONS_KEY, JSON.stringify(seedUserNotifications));
        return seedUserNotifications;
    }
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error('Error parsing user notifications from localStorage:', e);
        return seedUserNotifications;
    }
};

export const userNotificationService = {
    // 1. Lấy toàn bộ thông báo của người dùng (Query parameters phân trang & lọc chưa đọc)
    getNotifications: async (unreadOnly = false, page = 0, size = 100) => {
        try {
            const response = await apiClient.get('/api/v1/notifications', {
                params: { unreadOnly, page, size }
            });
            // Nếu có kết quả trả về đúng chuẩn Spring Page, trả về phần content
            if (response && response.content) {
                return response.content;
            }
            return response;
        } catch (error) {
            console.warn('Kết nối API Backend thất bại, tự động sử dụng dữ liệu cục bộ:', error.message);
            // Fallback sang Mock localStorage
            return new Promise((resolve) => {
                setTimeout(() => {
                    const list = getStoredNotifications();
                    let filteredList = list;
                    if (unreadOnly) {
                        filteredList = list.filter(item => !item.isRead);
                    }
                    const sorted = [...filteredList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    resolve(sorted);
                }, 300);
            });
        }
    },

    // 2. Đếm số lượng thông báo chưa đọc (Dùng cho Badge quả chuông)
    getUnreadCount: async () => {
        try {
            const response = await apiClient.get('/api/v1/notifications/unread-count');
            // Thừa nhận payload trả về dạng { unreadCount: X }
            if (response && response.unreadCount !== undefined) {
                return response.unreadCount;
            }
            return response;
        } catch (error) {
            console.warn('Không thể lấy Unread Count từ API Backend, đếm cục bộ:', error.message);
            const list = getStoredNotifications();
            const count = list.filter(n => !n.isRead).length;
            return count;
        }
    },

    // 3. Đánh dấu một thông báo cụ thể là Đã đọc
    markAsRead: async (id) => {
        try {
            await apiClient.put(`/api/v1/notifications/${id}/read`);
            return { success: true, id };
        } catch (error) {
            console.warn(`Đánh dấu đọc API thông báo ${id} thất bại, lưu cục bộ:`, error.message);
            return new Promise((resolve) => {
                setTimeout(() => {
                    const list = getStoredNotifications();
                    const updatedList = list.map(item => 
                        item.id === id ? { ...item, isRead: true, readAt: new Date().toISOString() } : item
                    );
                    localStorage.setItem(USER_NOTIFICATIONS_KEY, JSON.stringify(updatedList));
                    resolve({ success: true, id });
                }, 100);
            });
        }
    },

    // 4. Đánh dấu tất cả thông báo của User là Đã đọc
    markAllAsRead: async () => {
        try {
            await apiClient.put('/api/v1/notifications/read-all');
            return { success: true };
        } catch (error) {
            console.warn('Đánh dấu đọc toàn bộ qua API thất bại, lưu cục bộ:', error.message);
            return new Promise((resolve) => {
                setTimeout(() => {
                    const list = getStoredNotifications();
                    const updatedList = list.map(item => 
                        item.isRead ? item : { ...item, isRead: true, readAt: new Date().toISOString() }
                    );
                    localStorage.setItem(USER_NOTIFICATIONS_KEY, JSON.stringify(updatedList));
                    resolve({ success: true });
                }, 100);
            });
        }
    }
};
