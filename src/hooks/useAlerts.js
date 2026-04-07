import { useState, useCallback, useEffect } from 'react';
import alertService from '../services/alertService';
import { useToast } from '../components/UI/Toast';
import { useConfirmDialog } from '../components/UI/ConfirmDialog';

/**
 * Custom hook quản lý trạng thái và logic của module Alerts.
 * Tuân thủ nguyên lý SRP: Tách biệt logic fetch dữ liệu và xử lý nghiệp vụ khỏi UI Component.
 * 
 * @param {number} initialPageSize - Kích thước trang mặc định
 * @returns {Object} Các state và function điều khiển giao diện Alerts
 */
export const useAlerts = (initialPageSize = 10) => {
    // ==================== STATE ====================
    const [alerts, setAlerts] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Alert Detail state
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    
    // Pagination & Filtering state
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        severity: '',
        type: '',
        from: '',
        to: '',
        range: '24h', // Phạm vi thời gian cho summary (24h, 7d, 30d)
    });

    const [pagination, setPagination] = useState({
        page: 0,
        size: initialPageSize,
        totalItems: 0,
        totalPages: 0,
    });

    // Global UI hooks của hệ thống
    const toast = useToast();
    const { confirm } = useConfirmDialog();

    // ==================== FETCH ACTIONS ====================
    
    /**
     * Lấy dữ liệu thống kê tổng hợp (4 thẻ ở đầu trang)
     */
    const fetchSummary = useCallback(async () => {
        setSummaryLoading(true);
        try {
            const response = await alertService.getSummary(filters.range);
            // Handle both { data: {...} } and direct {...} response structures
            const summaryData = response?.data || response;
            console.log('Alert Summary Data:', summaryData);
            setSummary(summaryData);
        } catch (err) {
            console.error('Failed to fetch summary:', err);
        } finally {
            setSummaryLoading(false);
        }
    }, [filters.range]);

    /**
     * Lấy danh sách sự cố có phân trang và lọc
     */
    const fetchAlerts = useCallback(async (pageIndex) => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                ...filters,
                page: pageIndex,
                size: pagination.size
            };
            
            const data = await alertService.getAlerts(params);
            
            setAlerts(data.items || []);
            setPagination(prev => ({
                ...prev,
                page: data.page,
                totalItems: data.totalItems,
                totalPages: data.totalPages,
            }));
        } catch (err) {
            const message = err.message || 'Không thể tải danh sách sự cố';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, [filters, pagination.size, toast]);

    // Tự động load summary khi range thay đổi
    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    // Tự động load danh sách khi filters hoặc phân trang thay đổi
    useEffect(() => {
        fetchAlerts(0); // Reset về trang 0 khi filter thay đổi
    }, [filters.search, filters.status, filters.severity, filters.type, filters.from, filters.to]); // eslint-disable-line react-hooks/exhaustive-deps

    // ==================== BUSINESS ACTIONS ====================

    /**
     * Xác nhận đã tiếp nhận sự cố (Acknowledge)
     */
    const acknowledge = useCallback(async (id) => {
        try {
            await alertService.acknowledgeAlert(id);
            toast.success('Đã xác nhận sự cố thành công');
            fetchAlerts(pagination.page); // Reload trang hiện tại
            fetchSummary(); // Cập nhật lại số liệu thống kê
            return true;
        } catch (err) {
            toast.error('Lỗi khi xác nhận sự cố: ' + (err.message || 'Unknown error'));
            return false;
        }
    }, [pagination.page, fetchAlerts, fetchSummary, toast]);

    /**
     * Đóng sự cố thủ công (Resolve)
     */
    const resolve = useCallback(async (id) => {
        const confirmed = await confirm({
            title: 'Giải quyết sự cố',
            message: 'Bạn có chắc chắn muốn đánh dấu sự cố này là đã giải quyết?',
            confirmText: 'Giải quyết',
            type: 'info'
        });

        if (!confirmed) return false;

        try {
            await alertService.resolveAlert(id);
            toast.success('Đã giải quyết sự cố thành công');
            fetchAlerts(pagination.page);
            fetchSummary();
            return true;
        } catch (err) {
            toast.error('Lỗi khi giải quyết sự cố: ' + (err.message || 'Unknown error'));
            return false;
        }
    }, [confirm, pagination.page, fetchAlerts, fetchSummary, toast]);

    /**
     * Xuất dữ liệu ra file CSV
     */
    const exportData = useCallback(async () => {
        try {
            const blob = await alertService.exportAlerts({ ...filters, size: 1000 }); // Export nhiều hơn limit hiển thị
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `alerts-export-${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            toast.success('Bắt đầu tải xuống file CSV...');
        } catch (err) {
            toast.error('Lỗi khi xuất file CSV: ' + (err.message || 'Unknown error'));
        }
    }, [filters, toast]);
    
    /**
     * Xóa sự cố hoàn toàn (Delete)
     * Chỉ chủ sở hữu monitor mới có quyền xóa.
     */
    const remove = useCallback(async (id) => {
        const confirmed = await confirm({
            title: 'Xóa sự cố',
            message: 'Bạn có chắc chắn muốn xóa sự cố này? Hành động này không thể hoàn tác.',
            confirmText: 'Xóa vĩnh viễn',
            cancelText: 'Hủy',
            type: 'danger'
        });

        if (!confirmed) return false;

        try {
            await alertService.deleteAlert(id);
            toast.success('Đã xóa sự cố thành công');
            fetchAlerts(pagination.page);
            fetchSummary();
            return true;
        } catch (err) {
            const message = err.response?.status === 403 
                ? 'Bạn không có quyền xóa cảnh báo này' 
                : (err.message || 'Lỗi khi xóa sự cố');
            toast.error(message);
            return false;
        }
    }, [confirm, pagination.page, fetchAlerts, fetchSummary, toast]);

    /**
     * Thay đổi filter
     */
    const handleFilterChange = useCallback((newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    /**
     * Lấy chi tiết một sự cố theo ID
     */
    const getDetail = useCallback(async (id) => {
        setDetailLoading(true);
        try {
            const response = await alertService.getAlertDetail(id);
            const data = response?.data || response;
            setSelectedAlert(data);
            return data;
        } catch (err) {
            toast.error('Không thể tải chi tiết sự cố: ' + (err.message || 'Unknown error'));
            return null;
        } finally {
            setDetailLoading(false);
        }
    }, [toast]);

    /**
     * Đóng Modal chi tiết
     */
    const closeDetail = useCallback(() => {
        setSelectedAlert(null);
    }, []);


    /**
     * Thay đổi trang
     */
    const handlePageChange = useCallback((newPage) => {
        fetchAlerts(newPage);
    }, [fetchAlerts]);

    return {
        // State
        alerts,
        summary,
        loading,
        summaryLoading,
        error,
        filters,
        pagination,
        
        // Actions
        acknowledge,
        resolve,
        remove,
        exportData,
        handleFilterChange,
        handlePageChange,
        getDetail,
        closeDetail,
        selectedAlert,
        detailLoading,
        refresh: () => { fetchAlerts(pagination.page); fetchSummary(); }
    };
};
