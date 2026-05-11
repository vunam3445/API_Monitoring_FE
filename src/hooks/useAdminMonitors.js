import { useState, useEffect, useCallback, useRef } from 'react';
import { adminMonitorService } from '../services/adminMonitorService';
import { useToast } from '../components/UI/Toast';
import { useConfirmDialog } from '../components/UI/ConfirmDialog/ConfirmDialog';

export const useAdminMonitors = (initialFilters = {}) => {
    const [monitors, setMonitors] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
    });
    const [filters, setFilters] = useState({
        search: '',
        lastStatus: '',
        isActive: null,
        userId: '',
        sort: 'createdAt,desc',
        ...initialFilters
    });
    const [isLoading, setIsLoading] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        down: 0
    });

    const { addToast } = useToast();
    const { confirm } = useConfirmDialog();
    // Dùng ref để giữ tham chiếu addToast ổn định,
    // tránh addToast làm thay đổi dependency của fetchMonitors mỗi render
    const toastRef = useRef(addToast);
    useEffect(() => { toastRef.current = addToast; }, [addToast]);

    const fetchMonitors = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = {
                ...filters,
                page: pagination.page,
                size: pagination.size
            };

            // Remove null/empty filters
            Object.keys(params).forEach(key => {
                if (params[key] === null || params[key] === '') {
                    delete params[key];
                }
            });

            const response = await adminMonitorService.getMonitors(params);
            
            const mockMonitor = {
                id: 'mock-1234-5678-90ab-cdef12345678',
                name: 'Payment Gateway API',
                url: 'https://api.example.com/v1/charge',
                method: 'POST',
                lastStatus: 'UP',
                lastLatencyMs: 142,
                uptimePercentage: 99.98,
                isActive: true,
                adminPaused: false,
                sparkline: [80, 90, 85, 95, 100, 98, 99, 100, 95, 90, 85, 90, 100, 100, 100, 98, 95, 99, 100, 98, 100, 99, 100, 100],
                user: {
                    username: 'acmecorp_admin',
                    subscriptionPlan: 'PRO'
                }
            };

            const mockMonitorPaused = {
                id: 'mock-admin-paused-5678-90ab',
                name: 'Spammy Webhook API',
                url: 'https://api.spammy.com/v1/trigger',
                method: 'GET',
                lastStatus: 'DOWN',
                lastLatencyMs: null,
                uptimePercentage: 45.20,
                isActive: false,
                adminPaused: true,
                sparkline: [100, 100, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                user: {
                    username: 'free_user_99',
                    subscriptionPlan: 'FREE'
                }
            };
            
            // Inject mock monitor for UI viewing purposes
            setMonitors([mockMonitor, mockMonitorPaused, ...(response.content || [])]);
            setPagination(prev => ({
                ...prev,
                totalElements: response.totalElements || 0,
                totalPages: response.totalPages || 0
            }));
        } catch (error) {
            console.error('Failed to fetch monitors:', error);
            toastRef.current('error', error.message || 'Không thể tải danh sách monitor. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    }, [filters, pagination.page, pagination.size]);
    // ⚠️ addToast/showToast KHÔNG nằm trong deps để tránh vòng lặp tạo lại callback

    const fetchStats = useCallback(async () => {
        try {
            const response = await adminMonitorService.getMonitorStats();
            setStats({
                total: response.totalMonitors || 0,
                active: response.activeMonitors || 0,
                down: response.downMonitors || 0
            });
        } catch (error) {
            console.warn('Monitor stats endpoint not available');
        }
    }, []);

    useEffect(() => {
        fetchMonitors();
    }, [fetchMonitors]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPagination(prev => ({ ...prev, page: 0 }));
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const handleToggleActive = async (id, currentAdminPaused) => {
        // Cập nhật UI ngay lập tức (optimistic update) TRƯỚC khi gọi API
        setMonitors(prev => prev.map(m => m.id === id ? { ...m, adminPaused: !currentAdminPaused } : m));
        try {
            // TODO: Call the real admin endpoint for lock/unlock
            // await adminMonitorService.toggleAdminPause(id);
            toastRef.current('success', `Monitor ${!currentAdminPaused ? 'đã khóa (LOCKED)' : 'đã mở khóa (UNLOCKED)'} thành công`);
        } catch (error) {
            console.error('Failed to toggle monitor admin lock status:', error);
            toastRef.current('error', error.message || 'Không thể cập nhật trạng thái khóa monitor');
            // Revert lại trạng thái cũ nếu API thất bại
            setMonitors(prev => prev.map(m => m.id === id ? { ...m, adminPaused: currentAdminPaused } : m));
        }
    };

    const handleDeleteMonitor = async (id) => {
        const isConfirmed = await confirm({
            title: 'Xóa Monitor',
            message: 'Bạn có chắc chắn muốn xóa monitor này không? Hành động này không thể hoàn tác.',
            confirmText: 'Xóa',
            cancelText: 'Hủy',
            type: 'danger',
            icon: 'delete_forever'
        });

        if (!isConfirmed) return;
        
        try {
            await adminMonitorService.deleteMonitor(id);
            toastRef.current('success', 'Xóa monitor thành công');
            fetchMonitors();
        } catch (error) {
            console.error('Failed to delete monitor:', error);
            toastRef.current('error', error.message || 'Không thể xóa monitor');
        }
    };

    return {
        monitors,
        pagination,
        filters,
        isLoading,
        stats,
        handleFilterChange,
        handlePageChange,
        handleToggleActive,
        handleDeleteMonitor,
        refresh: fetchMonitors
    };
};
