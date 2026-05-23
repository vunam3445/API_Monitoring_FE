import { useState, useEffect, useCallback } from 'react';
import { adminMonitorService } from '../../../../../services/adminMonitorService';
import { useToast } from '../../../../../components/UI/Toast/ToastContext';

export const useAdminMonitors = () => {
    const [monitors, setMonitors] = useState([]);
    const [stats, setStats] = useState(null);
    const [charts, setCharts] = useState({
        responseTime: null,
        uptime: null,
        methods: null
    });
    const [isGlobalPaused, setIsGlobalPaused] = useState(false);
    const [timeRange, setTimeRange] = useState('1d');
    const [systemHealth, setSystemHealth] = useState(null);
    
    const [loading, setLoading] = useState(false);
    const [loadingStats, setLoadingStats] = useState(false);
    const [loadingCharts, setLoadingCharts] = useState(false);
    const [loadingActions, setLoadingActions] = useState(false);
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

    const fetchStats = useCallback(async (range) => {
        setLoadingStats(true);
        try {
            const [statsRes, statusRes, healthRes] = await Promise.all([
                adminMonitorService.getDashboardStats(range),
                adminMonitorService.getSystemStatus(),
                adminMonitorService.getSystemHealth()
            ]);
            
            if (statsRes) setStats(statsRes);
            if (statusRes) setIsGlobalPaused(statusRes.isGlobalPaused);
            if (healthRes) setSystemHealth(healthRes);
        } catch (error) {
            console.error('Failed to fetch dashboard stats:', error);
        } finally {
            setLoadingStats(false);
        }
    }, []);

    const fetchCharts = useCallback(async (range) => {
        setLoadingCharts(true);
        try {
            const [responseTime, uptime, methods] = await Promise.all([
                adminMonitorService.getResponseTimeChart(range),
                adminMonitorService.getUptimeChart(range),
                adminMonitorService.getMethodDistributionChart(range)
            ]);
            
            setCharts({
                responseTime,
                uptime,
                methods
            });
        } catch (error) {
            console.error('Failed to fetch dashboard charts:', error);
        } finally {
            setLoadingCharts(false);
        }
    }, []);

    useEffect(() => {
        fetchMonitors();
    }, [fetchMonitors]);

    useEffect(() => {
        fetchStats(timeRange);
    }, [fetchStats, timeRange]);

    useEffect(() => {
        fetchCharts(timeRange);
    }, [fetchCharts, timeRange]);

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

    const handleToggleGlobalPause = async () => {
        if (loadingActions) return;
        setLoadingActions(true);
        try {
            const nextStatus = !isGlobalPaused;
            const response = await adminMonitorService.toggleGlobalPause(nextStatus);
            if (response.success) {
                setIsGlobalPaused(response.isPaused);
                toast.success(response.message || `Đã ${response.isPaused ? 'tạm dừng' : 'kích hoạt'} giám sát toàn cục`);
            }
        } catch (error) {
            console.error('Failed to toggle global pause:', error);
            toast.error('Không thể thực hiện thao tác');
        } finally {
            setLoadingActions(false);
        }
    };

    const handleFlushQueue = async () => {
        if (loadingActions) return;
        setLoadingActions(true);
        try {
            const response = await adminMonitorService.flushQueue();
            if (response.success) {
                toast.success(response.message || 'Đã xóa sạch hàng đợi thành công');
            }
        } catch (error) {
            console.error('Failed to flush queue:', error);
            toast.error('Không thể xóa hàng đợi');
        } finally {
            setLoadingActions(false);
        }
    };

    const refresh = () => {
        fetchMonitors();
        fetchStats(timeRange);
        fetchCharts(timeRange);
    };

    return {
        monitors,
        stats,
        charts,
        systemHealth,
        isGlobalPaused,
        timeRange,
        setTimeRange,
        loading,
        loadingStats,
        loadingCharts,
        loadingActions,
        pagination,
        handlePageChange,
        handleToggleBlock,
        handleToggleGlobalPause,
        handleFlushQueue,
        refresh
    };
};
