import { useState, useEffect, useCallback } from 'react';
import { adminUserService } from '../../../../../services/adminUserService';
import { apiEndpointService } from '../../../../../services/apiEndpointService';
import { useToast } from '../../../../../components/UI/Toast';
import { useConfirmDialog } from '../../../../../components/UI/ConfirmDialog/ConfirmDialog';

export const useUserApis = (userId) => {
    const [apis, setApis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 0, size: 10, totalPages: 0, totalElements: 0 });
    const [selectedApi, setSelectedApi] = useState(null);
    const toast = useToast();
    const { confirm } = useConfirmDialog();

    const fetchApis = useCallback(async (page = 0) => {
        setLoading(true);
        try {
            const res = await adminUserService.getUserApis(userId, { page, size: pagination.size });
            setApis(res.content || []);
            setPagination(prev => ({
                ...prev,
                page: res.number !== undefined ? res.number : page,
                totalPages: res.totalPages || 0,
                totalElements: res.totalElements || 0
            }));
        } catch (error) {
            console.error('Failed to fetch APIs', error);
            toast.error('Lấy danh sách APIs thất bại');
        } finally {
            setLoading(false);
        }
    }, [userId, pagination.size, toast]);

    useEffect(() => {
        if (userId) fetchApis(0);
    }, [userId, fetchApis]);

    const handleToggleActive = async (id) => {
        try {
            const api = apis.find(a => a.id === id);
            const currentStatus = api ? api.isActive : false;

            await apiEndpointService.toggleActive(id);
            toast.success(`Monitor ${!currentStatus ? 'activated' : 'paused'} successfully`);
            fetchApis(pagination.page);
        } catch (error) {
            console.error('Failed to toggle active', error);
            toast.error('Cập nhật trạng thái thất bại');
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = await confirm({
            title: 'Xóa Monitor',
            message: 'Bạn có chắc chắn muốn xóa Monitor này không? Hành động này không thể hoàn tác.',
            confirmText: 'Xóa',
            cancelText: 'Hủy',
            type: 'danger',
            icon: 'delete_forever'
        });

        if (isConfirmed) {
            try {
                await apiEndpointService.deleteApi(id);
                toast.success('Xóa Monitor thành công');
                fetchApis(pagination.page);
            } catch (error) {
                console.error('Failed to delete API', error);
                toast.error('Xóa Monitor thất bại');
            }
        }
    };

    return {
        apis,
        loading,
        pagination,
        selectedApi,
        setSelectedApi,
        fetchApis,
        handleToggleActive,
        handleDelete
    };
};
