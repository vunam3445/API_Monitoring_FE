import { useState, useEffect, useCallback } from 'react';
import { adminUserService } from '../../../../../services/adminUserService';
import { useToast } from '../../../../../components/UI/Toast';

export const useUserAlerts = (userId) => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 0, size: 10, totalPages: 0, totalElements: 0 });
    const [selectedAlert, setSelectedAlert] = useState(null);
    const toast = useToast();

    const fetchAlerts = useCallback(async (page = 0) => {
        setLoading(true);
        try {
            const res = await adminUserService.getUserAlerts(userId, { page, size: pagination.size });
            setAlerts(res.items || res.alerts || []);
            setPagination(prev => ({
                ...prev,
                page: res.page !== undefined ? res.page : page,
                totalPages: res.totalPages || 0,
                totalElements: res.totalItems !== undefined ? res.totalItems : (res.totalElements || 0)
            }));
        } catch (error) {
            console.error('Failed to fetch Alerts', error);
            toast.error('Lấy danh sách cảnh báo thất bại');
        } finally {
            setLoading(false);
        }
    }, [userId, pagination.size, toast]);

    useEffect(() => {
        if (userId) fetchAlerts(0);
    }, [userId, fetchAlerts]);

    return {
        alerts,
        loading,
        pagination,
        selectedAlert,
        setSelectedAlert,
        fetchAlerts
    };
};
