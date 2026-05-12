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
            
            setMonitors(response.content || []);
            setPagination(prev => ({
                ...prev,
                totalElements: response.page?.totalElements || response.totalElements || 0,
                totalPages: response.page?.totalPages || response.totalPages || 0
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
                down: response.downMonitors || 0,
                platformCapacity: response.platformCapacity || 0
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

    const handleToggleActive = async (id, currentIsBlock) => {
        // Cập nhật UI ngay lập tức (optimistic update) TRƯỚC khi gọi API
        setMonitors(prev => prev.map(m => m.id === id ? { ...m, isBlock: !currentIsBlock, adminPaused: !currentIsBlock } : m));
        try {
            const isBlocked = await adminMonitorService.blockMonitor(id);
            toastRef.current('success', `Monitor ${isBlocked ? 'đã khóa (LOCKED)' : 'đã mở khóa (UNLOCKED)'} thành công`);
            // Cập nhật lại UI dựa trên kết quả trả về từ API
            setMonitors(prev => prev.map(m => m.id === id ? { ...m, isBlock: isBlocked, adminPaused: isBlocked } : m));
        } catch (error) {
            console.error('Failed to toggle monitor admin lock status:', error);
            toastRef.current('error', error.response?.data?.message || error.message || 'Không thể cập nhật trạng thái khóa monitor');
            // Revert lại trạng thái cũ nếu API thất bại
            setMonitors(prev => prev.map(m => m.id === id ? { ...m, isBlock: currentIsBlock, adminPaused: currentIsBlock } : m));
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
