import { apiClient } from './apiClient';

/**
 * Admin System Logs Service
 * Base Path: /api/v1/admin/system-logs
 */
export const adminSystemLogsService = {
    /**
     * Lấy danh sách system logs (có phân trang & bộ lọc)
     * Endpoint: GET /api/v1/admin/system-logs
     * @param {Object} params - { page, size, level, keyword, timeRange }
     */
    getLogs: async (params = {}) => {
        return apiClient.get('/api/v1/admin/system-logs', { params });
    },

    /**
     * Lấy số liệu thống kê logs trong ngày hôm nay
     * Endpoint: GET /api/v1/admin/system-logs/stats
     */
    getStats: async () => {
        return apiClient.get('/api/v1/admin/system-logs/stats');
    },

    /**
     * Thực hiện dọn dẹp các log cũ thủ công
     * Endpoint: DELETE /api/v1/admin/system-logs/clear
     * @param {number} retentionDays - Số ngày giữ lại logs
     */
    clearLogs: async (retentionDays = 30) => {
        return apiClient.delete('/api/v1/admin/system-logs/clear', {
            params: { retentionDays }
        });
    }
};
