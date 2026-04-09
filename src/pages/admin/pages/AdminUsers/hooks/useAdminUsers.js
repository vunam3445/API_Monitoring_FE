import { useState, useEffect, useCallback } from 'react';
import { adminUserService } from '../../../../../services/adminUserService';
import { useToast } from '../../../../../components/UI/Toast/ToastContext';

export const useAdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [stats, setStats] = useState(null);
    const [loadingStats, setLoadingStats] = useState(false);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
        last: true
    });

    const [filters, setFilters] = useState({
        email: '',
        fullName: '',
        status: '',
        role: '',
        planType: '',
        sort: 'createdAt,desc'
    });

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                page: pagination.page,
                size: pagination.size,
                sort: filters.sort,
                ...(filters.email && { email: filters.email }),
                ...(filters.fullName && { fullName: filters.fullName }),
                ...(filters.status && { status: filters.status }),
                ...(filters.role && { role: filters.role }),
                ...(filters.planType && { planType: filters.planType }),
            };

            const response = await adminUserService.getUsers(params);
            
            if (response) {
                const { content, page } = response;
                setUsers(content || []);
                setPagination(prev => ({
                    ...prev,
                    totalElements: page?.totalElements || 0,
                    totalPages: page?.totalPages || 1,
                    last: (page?.number >= (page?.totalPages - 1)) ?? true
                }));
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
            toast.error('Không thể tải danh sách người dùng');
        } finally {
            setLoading(false);
        }
    }, [pagination.page, pagination.size, filters, toast]);

    const fetchStats = useCallback(async () => {
        setLoadingStats(true);
        try {
            const response = await adminUserService.getUserStats();
            if (response) {
                setStats(response);
            }
        } catch (error) {
            console.error('Failed to fetch user stats:', error);
        } finally {
            setLoadingStats(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const refreshAll = useCallback(async () => {
        await Promise.all([fetchUsers(), fetchStats()]);
    }, [fetchUsers, fetchStats]);

    const handleBlockUser = async (userId) => {
        try {
            await adminUserService.blockUser(userId);
            toast.success('Đã khóa tài khoản người dùng');
            refreshAll();
        } catch (error) {
            toast.error(error.message || 'Không thể khóa tài khoản người dùng');
        }
    };

    const handleActiveUser = async (userId) => {
        try {
            await adminUserService.activeUser(userId);
            toast.success('Đã kích hoạt tài khoản người dùng');
            refreshAll();
        } catch (error) {
            toast.error(error.message || 'Không thể kích hoạt tài khoản người dùng');
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPagination(prev => ({ ...prev, page: 0 })); 
    };

    return {
        users,
        loading,
        stats,
        loadingStats,
        pagination,
        filters,
        handleBlockUser,
        handleActiveUser,
        handlePageChange,
        handleFilterChange,
        refresh: refreshAll
    };
};
