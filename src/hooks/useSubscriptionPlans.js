import { useState, useCallback, useEffect } from 'react';
import { subscriptionPlanService } from '../services/subscriptionPlanService';
import { useToast } from '../components/UI/Toast';
import { useConfirmDialog } from '../components/UI/ConfirmDialog';

/**
 * Custom hook quản lý toàn bộ logic CRUD + phân trang cho Subscription Plans.
 * 
 * Tuân thủ SRP: Tách logic xử lý dữ liệu ra khỏi component UI.
 * Component chỉ cần gọi hook này để có đầy đủ:
 * - plans, loading, error (state)
 * - fetchPlans, createPlan, updatePlan, deletePlan (actions)
 * - pagination, handlePageChange (phân trang)
 * - selectedPlan, setSelectedPlan (chọn plan để xem chi tiết)
 */
export const useSubscriptionPlans = (pageSize = 10, defaultSort = 'name,asc') => {
    // ==================== STATE ====================
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const [pagination, setPagination] = useState({
        page: 0,
        size: pageSize,
        sort: defaultSort,
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
    });

    // Global hooks
    const toast = useToast();
    const { confirm } = useConfirmDialog();

    // ==================== FETCH (READ) ====================
    const fetchPlans = useCallback(async (page = 0) => {
        setLoading(true);
        setError(null);
        try {
            const data = await subscriptionPlanService.getPaging({
                page,
                size: pagination.size,
                sort: pagination.sort,
            });

            setPlans(data.content || []);
            setPagination((prev) => ({
                ...prev,
                page: data.number,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                first: data.first,
                last: data.last,
            }));

            // Auto-select plan đầu tiên nếu chưa chọn
            if (data.content?.length > 0) {
                setSelectedPlan((prev) => {
                    // Giữ nguyên selection nếu plan vẫn còn trong danh sách
                    if (prev && data.content.find((p) => p.id === prev.id)) {
                        return data.content.find((p) => p.id === prev.id);
                    }
                    return data.content[0];
                });
            } else {
                setSelectedPlan(null);
            }
        } catch (err) {
            const message = err.message || 'Không thể tải danh sách plans';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [pagination.size, pagination.sort, toast]);

    // Load lần đầu
    useEffect(() => {
        fetchPlans(0);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ==================== CREATE ====================
    const createPlan = useCallback(async (planData) => {
        try {
            await subscriptionPlanService.create(planData);
            toast.success('Tạo plan mới thành công!');
            await fetchPlans(pagination.page);
        } catch (err) {
            toast.error('Tạo plan thất bại: ' + (err.message || 'Unknown error'));
            throw err; // Re-throw để modal biết có lỗi → không đóng
        }
    }, [pagination.page, fetchPlans, toast]);

    // ==================== UPDATE ====================
    const updatePlan = useCallback(async (id, planData) => {
        try {
            await subscriptionPlanService.update(id, planData);
            toast.success(`Cập nhật plan "${planData.name}" thành công!`);
            await fetchPlans(pagination.page);
        } catch (err) {
            toast.error('Cập nhật plan thất bại: ' + (err.message || 'Unknown error'));
            throw err;
        }
    }, [pagination.page, fetchPlans, toast]);

    // ==================== DELETE (với ConfirmDialog) ====================
    const deletePlan = useCallback(async (plan) => {
        const confirmed = await confirm({
            title: 'Xoá Subscription Plan',
            message: `Bạn có chắc chắn muốn xoá plan "${plan.name}"? Hành động này không thể hoàn tác.`,
            confirmText: 'Xoá Plan',
            cancelText: 'Huỷ',
            type: 'danger',
            icon: 'delete_forever',
        });

        if (!confirmed) return false;

        try {
            await subscriptionPlanService.delete(plan.id);
            toast.success(`Đã xoá plan "${plan.name}" thành công!`);

            // Clear selection nếu đang chọn plan vừa xoá
            if (selectedPlan?.id === plan.id) {
                setSelectedPlan(null);
            }

            await fetchPlans(pagination.page);
            return true;
        } catch (err) {
            toast.error('Xoá plan thất bại: ' + (err.message || 'Unknown error'));
            return false;
        }
    }, [confirm, selectedPlan, pagination.page, fetchPlans, toast]);

    // ==================== PAGINATION ====================
    const handlePageChange = useCallback((newPage) => {
        if (newPage < 0 || newPage >= pagination.totalPages) return;
        fetchPlans(newPage);
    }, [pagination.totalPages, fetchPlans]);

    const goToFirstPage = useCallback(() => handlePageChange(0), [handlePageChange]);
    const goToLastPage = useCallback(() => handlePageChange(pagination.totalPages - 1), [handlePageChange, pagination.totalPages]);
    const goToNextPage = useCallback(() => handlePageChange(pagination.page + 1), [handlePageChange, pagination.page]);
    const goToPrevPage = useCallback(() => handlePageChange(pagination.page - 1), [handlePageChange, pagination.page]);

    // ==================== COMPUTED VALUES ====================
    const activePlansCount = plans.filter((p) => p.isActive).length;
    const inactivePlansCount = plans.length - activePlansCount;
    const priceRange = plans.length > 0
        ? { min: Math.min(...plans.map((p) => p.price || 0)), max: Math.max(...plans.map((p) => p.price || 0)) }
        : null;

    // ==================== RETURN ====================
    return {
        // State
        plans,
        loading,
        error,
        selectedPlan,
        setSelectedPlan,
        pagination,

        // Actions
        fetchPlans,
        createPlan,
        updatePlan,
        deletePlan,
        refresh: () => fetchPlans(pagination.page),

        // Pagination helpers
        handlePageChange,
        goToFirstPage,
        goToLastPage,
        goToNextPage,
        goToPrevPage,

        // Computed
        activePlansCount,
        inactivePlansCount,
        priceRange,
    };
};
