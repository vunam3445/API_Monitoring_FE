// Dịch vụ quản lý gửi thông báo hệ thống của Admin (Kết nối API Backend Spring Boot & Mock Fallback)
import { apiClient } from './apiClient';

const BROADCASTS_KEY = 'api_monitor_admin_broadcasts';

// Khởi tạo danh sách thông báo mẫu sinh động nếu chưa tồn tại (Mock Fallback)
const initialBroadcasts = [
    {
        id: 'bc-1',
        title: 'Bảo trì nâng cấp hệ thống định kỳ tháng 5',
        content: 'Hệ thống API Monitoring sẽ tiến hành bảo trì nâng cấp hạ tầng định kỳ vào lúc 02:00 AM đến 04:00 AM ngày 28/05/2026. Trong thời gian này, các tính năng kiểm tra trạng thái và thống kê thời gian hoạt động của API có thể bị gián đoạn tạm thời. Kính mong quý khách hàng thông cảm và chuẩn bị kế hoạch vận hành phù hợp.',
        targetType: 'ALL',
        targetValue: null,
        level: 'SYSTEM',
        sendWeb: true,
        sendEmail: true,
        createdAt: '2026-05-24T10:00:00.000Z'
    },
    {
        id: 'bc-2',
        title: 'Thay đổi giới hạn giám sát đối với nhóm người dùng gói cước Free',
        content: 'Kính gửi quý khách hàng đang sử dụng gói dịch vụ Free. Nhằm tối ưu hóa hiệu năng tổng thể của hệ thống, bắt đầu từ ngày 01/06/2026, giới hạn số lượng monitor giám sát đồng thời cho tài khoản Free sẽ được điều chỉnh từ 5 xuống còn 3. Để không bị gián đoạn giám sát hệ thống, quý khách có thể cân nhắc nâng cấp lên các gói trả phí chuyên nghiệp hơn.',
        targetType: 'PLAN',
        targetValue: 'FREE',
        level: 'WARNING',
        sendWeb: true,
        sendEmail: false,
        createdAt: '2026-05-23T14:30:00.000Z'
    },
    {
        id: 'bc-3',
        title: 'Chương trình tri ân: Ưu đãi 20% khi gia hạn gói cước Enterprise',
        content: 'API Monitor hân hạnh mang tới chương trình tri ân hè 2026 cực kỳ hấp dẫn! Giảm ngay 20% chi phí đăng ký mới hoặc gia hạn thêm gói cước cao cấp Enterprise cho tất cả khách hàng thân thiết. Chương trình áp dụng từ nay đến hết ngày 30/06/2026. Nhập mã voucher: HELLO2026 khi làm thủ tục gia hạn hoặc liên hệ trực tiếp đội ngũ CSKH để được hướng dẫn chi tiết.',
        targetType: 'ALL',
        targetValue: null,
        level: 'INFO',
        sendWeb: true,
        sendEmail: true,
        createdAt: '2026-05-22T08:15:00.000Z'
    }
];

const getStoredBroadcasts = () => {
    const data = localStorage.getItem(BROADCASTS_KEY);
    if (!data) {
        localStorage.setItem(BROADCASTS_KEY, JSON.stringify(initialBroadcasts));
        return initialBroadcasts;
    }
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error('Error parsing broadcasts from localStorage:', e);
        return initialBroadcasts;
    }
};

export const adminBroadcastService = {
    // Lấy danh sách toàn bộ thông báo đã gửi (Query parameters phân trang)
    getBroadcasts: async (page = 0, size = 100) => {
        try {
            const response = await apiClient.get('/api/v1/admin/notifications', {
                params: { page, size }
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
                    const list = getStoredBroadcasts();
                    const sorted = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    resolve(sorted);
                }, 300);
            });
        }
    },

    // Gửi thông báo hệ thống mới
    sendBroadcast: async (broadcastData) => {
        try {
            return await apiClient.post('/api/v1/admin/notifications', broadcastData);
        } catch (error) {
            console.warn('Kết nối API Backend thất bại, tự động gửi và lưu cục bộ:', error.message);
            // Fallback sang Mock localStorage
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (!broadcastData.title || !broadcastData.content) {
                        return reject(new Error('Tiêu đề và nội dung thông báo không được để trống!'));
                    }

                    const list = getStoredBroadcasts();
                    const newBroadcast = {
                        id: `bc-${Date.now()}`,
                        title: broadcastData.title,
                        content: broadcastData.content,
                        targetType: broadcastData.targetType,
                        targetValue: broadcastData.targetValue || null,
                        level: broadcastData.level || 'INFO',
                        sendWeb: broadcastData.sendWeb !== undefined ? broadcastData.sendWeb : true,
                        sendEmail: broadcastData.sendEmail !== undefined ? broadcastData.sendEmail : true,
                        createdAt: new Date().toISOString()
                    };

                    const updatedList = [newBroadcast, ...list];
                    localStorage.setItem(BROADCASTS_KEY, JSON.stringify(updatedList));
                    resolve(newBroadcast);
                }, 500);
            });
        }
    }
};
