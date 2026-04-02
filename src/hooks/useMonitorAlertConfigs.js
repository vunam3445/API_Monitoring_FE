import { useState, useCallback, useEffect } from 'react';
import alertService from '../services/alertService';
import { useToast } from '../components/UI/Toast';
import { useConfirmDialog } from '../components/UI/ConfirmDialog';

/**
 * Hook to manage Alert Configurations for a specific Monitor.
 * Handles CRUD operations, toggling, and testing notifications.
 */
export const useMonitorAlertConfigs = (monitorId) => {
    const [configs, setConfigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    
    const toast = useToast();
    const { confirm } = useConfirmDialog();

    const fetchConfigs = useCallback(async () => {
        if (!monitorId) return;
        setLoading(true);
        try {
            const data = await alertService.getMonitorConfigs(monitorId);
            setConfigs(data || []);
        } catch (err) {
            console.error('Failed to fetch monitor configs:', err);
            // toast.error('Không thể tải cấu hình thông báo');
        } finally {
            setLoading(false);
        }
    }, [monitorId]);

    useEffect(() => {
        fetchConfigs();
    }, [fetchConfigs]);

    const addConfig = async (data) => {
        setIsProcessing(true);
        try {
            const result = await alertService.addConfig(monitorId, data);
            toast.success('Đã thêm kênh thông báo mới');
            fetchConfigs();
            return result;
        } catch (err) {
            toast.error('Lỗi khi thêm kênh: ' + (err.message || 'Unknown error'));
            throw err;
        } finally {
            setIsProcessing(false);
        }
    };

    const updateConfig = async (id, data) => {
        setIsProcessing(true);
        try {
            const result = await alertService.updateConfig(id, data);
            toast.success('Đã cập nhật kênh thông báo');
            fetchConfigs();
            return result;
        } catch (err) {
            toast.error('Lỗi khi cập nhật: ' + (err.message || 'Unknown error'));
            throw err;
        } finally {
            setIsProcessing(false);
        }
    };

    const toggleConfig = async (id) => {
        try {
            await alertService.toggleConfig(id);
            // Optimistic update locally
            setConfigs(prev => prev.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c));
            // toast.success('Đã thay đổi trạng thái kênh');
        } catch (err) {
            toast.error('Lỗi khi thay đổi trạng thái: ' + (err.message || 'Unknown error'));
            fetchConfigs(); // Rollback
        }
    };

    const deleteConfig = async (config) => {
        const confirmed = await confirm({
            title: 'Xóa kênh thông báo',
            message: `Bạn có chắc muốn xóa kênh ${config.type} (${config.destination})?`,
            confirmText: 'Xóa vĩnh viễn',
            type: 'danger'
        });

        if (!confirmed) return false;

        setIsProcessing(true);
        try {
            await alertService.deleteConfig(config.id);
            toast.success('Đã xóa kênh thông báo');
            fetchConfigs();
            return true;
        } catch (err) {
            toast.error('Lỗi khi xóa kênh: ' + (err.message || 'Unknown error'));
            return false;
        } finally {
            setIsProcessing(false);
        }
    };

    const testNotification = async (type, destination) => {
        setIsProcessing(true);
        try {
            if (type === 'EMAIL') {
                await alertService.testEmail(destination);
            } else if (type === 'SLACK') {
                await alertService.testSlack(destination);
            }
            toast.success('Đã gửi thông báo kiểm tra. Hãy kiểm tra hộp thư/kênh của bạn.');
            return true;
        } catch (err) {
            toast.error('Lỗi khi gửi test: ' + (err.message || 'Unknown error'));
            return false;
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        configs,
        loading,
        isProcessing,
        addConfig,
        updateConfig,
        toggleConfig,
        deleteConfig,
        testNotification,
        refresh: fetchConfigs
    };
};
