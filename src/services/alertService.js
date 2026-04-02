import { apiClient } from './apiClient';

/**
 * Service for handling all Alert related API calls.
 * Follows SOLID principles by separating alert-specific logic from other domains.
 */
const alertService = {
  /**
   * Get overall alert statistics (Total, Active, Resolved, etc.)
   * @param {string} range - Time range: '24h', '7d', '30d'
   */
  getSummary: (range = '24h') => 
    apiClient.get(`/api/v1/alerts/summary`, { params: { range } }),

  /**
   * Fetch paginated list of alerts with filtering
   * @param {Object} params - search, status, severity, type, from, to, page, size
   */
  getAlerts: (params) => 
    apiClient.get(`/api/v1/alerts`, { params }),

  /**
   * Get detailed information for a specific alert
   * @param {string} id - Alert ID
   */
  getAlertDetail: (id) => 
    apiClient.get(`/api/v1/alerts/${id}`),

  /**
   * Acknowledge an active alert
   * @param {string} id - Alert ID
   */
  acknowledgeAlert: (id) => 
    apiClient.patch(`/api/v1/alerts/${id}/acknowledge`),

  /**
   * Manually resolve an alert
   * @param {string} id - Alert ID
   */
  resolveAlert: (id) => 
    apiClient.patch(`/api/v1/alerts/${id}/resolve`),

  /**
   * Export alerts to CSV
   * @param {Object} params - same as getAlerts
   */
  exportAlerts: (params) => 
    apiClient.get(`/api/v1/alerts/export`, { params, responseType: 'blob' }),

  /**
   * Get notification channels configured for a monitor
   * @param {string} monitorId 
   */
  getMonitorConfigs: (monitorId) => 
    apiClient.get(`/api/v1/monitors/${monitorId}/alert-configs`),

  /**
   * Add a new notification channel for a monitor
   * @param {string} monitorId 
   * @param {Object} data - { type: "EMAIL"|"SLACK", destination: "..." }
   */
  addConfig: (monitorId, data) => 
    apiClient.post(`/api/v1/monitors/${monitorId}/alert-configs`, data),

  /**
   * Update an existing notification channel
   * @param {string} id - Config ID
   * @param {Object} data - { type, destination }
   */
  updateConfig: (id, data) => 
    apiClient.put(`/api/v1/monitors/alert-configs/${id}`, data),

  /**
   * Toggle (Enable/Disable) a notification channel
   * @param {string} id - Config ID
   */
  toggleConfig: (id) => 
    apiClient.patch(`/api/v1/monitors/alert-configs/${id}/toggle`),

  /**
   * Delete a notification channel permanently
   * @param {string} id - Config ID
   */
  deleteConfig: (id) => 
    apiClient.delete(`/api/v1/monitors/alert-configs/${id}`),

  /**
   * Test SMTP Email configuration
   * @param {string} to - Dest email
   */
  testEmail: (to) => 
    apiClient.post(`/api/v1/alerts/test/email`, { to }),

  /**
   * Test Slack Webhook configuration
   * @param {string} webhookUrl 
   */
  testSlack: (webhookUrl) => 
    apiClient.post(`/api/v1/alerts/test/slack`, { webhookUrl }),

  /**
   * Xóa cảnh báo vĩnh viễn (Chỉ chủ sở hữu monitor mới có quyền)
   * @param {string} id - Alert ID
   */
  deleteAlert: (id) => 
    apiClient.delete(`/api/v1/alerts/${id}`),
};

export default alertService;
