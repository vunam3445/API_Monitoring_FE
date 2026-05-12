import { useState, useEffect, useCallback } from 'react';
import { adminMonitorService } from '../../../../../services/adminMonitorService';
import { useToast } from '../../../../../components/UI/Toast/ToastContext';

export const useAdminMonitors = () => {
    const [monitors, setMonitors] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingStats, setLoadingStats] = useState(false);
    const toast = useToast();
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
    });

    const fetchMonitors = useCallback(async (params = {}) => {
        setLoading(true);
        try {
            const queryParams = {
                page: pagination.page,
                size: pagination.size,
                ...params
            };
            const response = await adminMonitorService.getMonitors(queryParams);
            if (response) {
                setMonitors(response.content || []);
                setPagination(prev => ({
                    ...prev,
                    totalElements: response.page?.totalElements || 0,
                    totalPages: response.page?.totalPages || 0
                }));
            }
        } catch (error) {
            console.error('Failed to fetch admin monitors:', error);
            toast.error('Không thể tải danh sách giám sát');
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.size, toast]);

    const fetchStats = useCallback(async () => {
        setLoadingStats(true);
        try {
            const response = await adminMonitorService.getMonitorStats();
            if (response) {
                setStats(response);
            }
        } catch (error) {
            console.error('Failed to fetch monitor stats:', error);
        } finally {
            setLoadingStats(false);
        }
    }, []);

    useEffect(() => {
        fetchMonitors();
    }, [fetchMonitors]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const handleToggleBlock = async (id) => {
        try {
            const isBlocked = await adminMonitorService.blockMonitor(id);
            setMonitors(prev => prev.map(m => m.id === id ? { ...m, isBlock: isBlocked } : m));
            toast.success(`Đã ${isBlocked ? 'khóa' : 'mở khóa'} API thành công`);
        } catch (error) {
            console.error('Failed to block monitor:', error);
            toast.error('Có lỗi xảy ra khi thực hiện thao tác');
        }
    };

    return {
        monitors,
        stats,
        loading,
        loadingStats,
        pagination,
        handlePageChange,
        handleToggleBlock,
        refresh: () => {
            fetchMonitors();
            fetchStats();
        }
    };
};
