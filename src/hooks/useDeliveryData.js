import { useState, useEffect, useCallback } from 'react';
import { deliveryService } from '../services/deliveryService';
import { useToast } from '../components/UI/Toast';

/**
 * Custom hook to manage notification delivery data and actions
 */
export const useDeliveryData = () => {
    const toast = useToast();
    const [stats, setStats] = useState(null);
    const [logs, setLogs] = useState({ content: [], totalPages: 0 });
    const [loading, setLoading] = useState(true);
    const [isRetryingAll, setIsRetryingAll] = useState(false);
    const [filters, setFilters] = useState({
        page: 0,
        size: 20,
        channel: '',
        status: '',
        search: ''
    });

    const fetchStats = useCallback(async () => {
        try {
            const response = await deliveryService.getStats();
            setStats(response);
        } catch (error) {
            console.error('Failed to fetch delivery stats:', error);
        }
    }, []);

    const fetchLogs = useCallback(async () => {
        setLoading(true);
        try {
            const response = await deliveryService.getLogs(filters);
            setLogs(response);
        } catch (error) {
            console.error('Failed to fetch delivery logs:', error);
            toast.error('Could not load delivery logs');
        } finally {
            setLoading(false);
        }
    }, [filters, toast]);

    useEffect(() => {
        fetchStats();
        fetchLogs();
    }, [fetchStats, fetchLogs]);

    const handleRetryAll = async () => {
        if (isRetryingAll) return;
        
        setIsRetryingAll(true);
        try {
            await deliveryService.retryAll();
            toast.success('Đã bắt đầu gửi lại toàn bộ thông báo lỗi thành công');
            // Refresh data after a short delay
            setTimeout(() => {
                fetchStats();
                fetchLogs();
            }, 1000);
        } catch (error) {
            toast.error('Gửi lại toàn bộ thông báo thất bại');
        } finally {
            setIsRetryingAll(false);
        }
    };

    const handleRetrySingle = async (id) => {
        try {
            await deliveryService.retrySingle(id);
            toast.success('Đã gửi lại thông báo thành công');
            setTimeout(() => {
                fetchStats();
                fetchLogs();
            }, 1000);
        } catch (error) {
            toast.error('Gửi lại thông báo thất bại');
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handlePageChange = (newPage) => {
        setFilters(prev => ({ ...prev, page: newPage }));
    };

    return {
        stats,
        logs,
        loading,
        isRetryingAll,
        filters,
        handleRetryAll,
        handleRetrySingle,
        handleFilterChange,
        handlePageChange,
        refresh: () => {
            fetchStats();
            fetchLogs();
        }
    };
};
