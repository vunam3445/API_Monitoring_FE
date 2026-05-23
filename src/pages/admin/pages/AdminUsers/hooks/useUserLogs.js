import { useState, useEffect, useCallback } from 'react';
import { adminUserService } from '../../../../../services/adminUserService';
import { apiEndpointService } from '../../../../../services/apiEndpointService';
import { useToast } from '../../../../../components/UI/Toast';

export const useUserLogs = (userId) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 0, size: 10, totalPages: 0, totalElements: 0 });
    const [selectedLog, setSelectedLog] = useState(null);
    const toast = useToast();

    const fetchLogs = useCallback(async (page = 0) => {
        setLoading(true);
        try {
            const res = await adminUserService.getUserUptimeLogs(userId, { page, size: pagination.size });
            setLogs(res.content || []);
            setPagination(prev => ({
                ...prev,
                page: res.number !== undefined ? res.number : page,
                totalPages: res.totalPages || 0,
                totalElements: res.totalElements || 0
            }));
        } catch (error) {
            console.error('Failed to fetch Logs', error);
            toast.error('Lấy danh sách nhật ký thất bại');
        } finally {
            setLoading(false);
        }
    }, [userId, pagination.size, toast]);

    useEffect(() => {
        if (userId) fetchLogs(0);
    }, [userId, fetchLogs]);

    const handleRetry = async (monitorId) => {
        if (!monitorId) return;
        try {
            await apiEndpointService.retryApi(monitorId);
            toast.success('Tái khởi động kiểm tra thành công');
            setTimeout(() => fetchLogs(pagination.page), 1500);
        } catch (error) {
            console.error('Retry failed:', error);
            const errorMsg = error?.message || error?.response?.data?.message || 'Không thể khởi động kiểm tra';
            toast.error(errorMsg);
        }
    };

    return {
        logs,
        loading,
        pagination,
        selectedLog,
        setSelectedLog,
        fetchLogs,
        handleRetry
    };
};
