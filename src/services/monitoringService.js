import { apiClient } from './apiClient';

/**
 * Monitoring Service - Standardized API endpoints
 */
export const monitoringService = {
  // 1. Dashboard Overview
  getSummary: async () => {
    return await apiClient.get('/api/monitoring/summary');
  },

  getLatencyChart: async (range = '24h', monitorId = null) => {
    const params = { range };
    if (monitorId) params.monitorId = monitorId;
    return await apiClient.get('/api/monitoring/charts/response-time', { params });
  },

  getErrorRateChart: async (range = '24h', monitorId = null) => {
    const params = { range };
    if (monitorId) params.monitorId = monitorId;
    return await apiClient.get('/api/monitoring/charts/error-rate', { params });
  },

  getKeyHealth: async () => {
    return await apiClient.get('/api/monitoring/key-health');
  },

  getRecentEvents: async (limit = 10) => {
    return await apiClient.get('/api/monitoring/events', { params: { limit } });
  },

  // 2. Search & Logs
  search: async (keyword) => {
    return await apiClient.get('/api/monitoring/search', { params: { keyword } });
  },

  getLogs: async (params = {}) => {
    return await apiClient.get('/api/monitoring/logs', { params });
  },

  // 3. Monitor Details
  getMonitorOverview: async (id) => {
    return await apiClient.get(`/api/monitoring/${id}/overview`);
  },

  getMonitorTrend: async (id, range = '1h') => {
    return await apiClient.get(`/api/monitoring/${id}/trend`, { params: { range } });
  },

  getMonitorUptimeHistory: async (id, range = '24h') => {
    return await apiClient.get(`/api/monitoring/${id}/uptime`, { params: { range } });
  },

  // 4. API Management (MonitorController)
  getUserMonitors: async (userId, params = {}) => {
    return await apiClient.get(`/api/Apis/user/${userId}`, { params });
  },

  getMonitorDetail: async (id) => {
    return await apiClient.get(`/api/Apis/${id}`);
  },

  toggleMonitorStatus: async (id) => {
    return await apiClient.put(`/api/Apis/${id}/status`);
  }
};
