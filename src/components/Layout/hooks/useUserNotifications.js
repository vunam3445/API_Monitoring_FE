import { useState, useEffect, useCallback } from 'react';
import { userNotificationService } from '../../../services/userNotificationService';
import { EventSourcePolyfill } from 'event-source-polyfill';

export const useUserNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    // Tính toán số thông báo chưa đọc
    const unreadCount = notifications.filter(n => !(n.isRead || n.read)).length;

    // Tải danh sách thông báo qua REST API lúc ban đầu
    const fetchNotifications = useCallback(async () => {
        setLoading(true);
        try {
            const data = await userNotificationService.getNotifications();
            // Đảm bảo map chuẩn các trường isRead từ server
            const formatted = data.map(item => ({
                ...item,
                read: item.isRead || item.read || false
            }));
            setNotifications(formatted);
        } catch (error) {
            console.error('Failed to fetch user notifications:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // 1. Khởi chạy fetch lần đầu khi mount
    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    // 2. Thiết lập kết nối SSE thời gian thực qua Polyfill
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        const API_DOMAIN = import.meta.env.VITE_API_DOMAIN || 'http://localhost:8080/';
        const url = `${API_DOMAIN}api/v1/notifications/subscribe`;

        const eventSource = new EventSourcePolyfill(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          heartbeatTimeout: 1800000 // 30 phút theo timeout của Spring Boot emitter
        });

        // Lắng nghe sự kiện "notification" đẩy trực tiếp từ server
        eventSource.addEventListener("notification", (event) => {
            try {
                const newNotif = JSON.parse(event.data);

                // Tự động chuẩn hóa trường đọc
                const formattedNotif = {
                    ...newNotif,
                    read: newNotif.isRead || newNotif.read || false
                };

                // Đẩy thông báo mới lên đầu danh sách state tức thì mà không cần F5 hoặc Polling
                setNotifications(prev => {
                    // Tránh trùng lặp nếu trùng ID
                    if (prev.some(item => item.id === formattedNotif.id)) {
                        return prev;
                    }
                    return [formattedNotif, ...prev];
                });

            } catch (err) {
                // Chỉ log khi thực sự gặp lỗi phân tích cú pháp nghiêm trọng
                console.error("[SSE] Lỗi parse dữ liệu thông báo:", err);
            }
        });

        return () => {
            eventSource.close();
        };
    }, []);

    // Đánh dấu 1 thông báo đã đọc
    const markAsRead = async (id) => {
        try {
            await userNotificationService.markAsRead(id);
            setNotifications(prev => 
                prev.map(item => item.id === id ? { ...item, isRead: true, read: true } : item)
            );
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    // Đánh dấu tất cả đã đọc
    const markAllAsRead = async () => {
        try {
            await userNotificationService.markAllAsRead();
            setNotifications(prev => 
                prev.map(item => (item.isRead || item.read) ? item : { ...item, isRead: true, read: true })
            );
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const handleSelectNotification = (notification) => {
        setSelectedNotification(notification);
        if (!(notification.isRead || notification.read)) {
            markAsRead(notification.id);
        }
    };

    return {
        notifications,
        loading,
        unreadCount,
        selectedNotification,
        setSelectedNotification,
        markAsRead,
        markAllAsRead,
        handleSelectNotification,
        refresh: fetchNotifications
    };
};
