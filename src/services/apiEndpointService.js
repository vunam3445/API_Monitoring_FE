import { apiClient } from './apiClient';

export const apiEndpointService = {
  /**
   * Get paginated list of APIs for a specific user
   * @param {string} userId - User UUID
   * @param {number} page - Page number (0-indexed)
   * @param {number} size - Page size
   */
  getApis: async (userId, page = 0, size = 10, sort = '', isActive = null, lastStatus = null, search = '') => {
    let url = `/api/Apis/user/${userId}?page=${page}&size=${size}`;
    if (sort) url += `&sort=${sort}`;
    if (isActive !== null) url += `&isActive=${isActive}`;
    if (lastStatus) url += `&lastStatus=${lastStatus}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    return apiClient.get(url);
  },
  
  /**
   * Create a new API monitor endpoint
   * @param {object} payload - API Payload
   */
  createApi: async (payload) => {
    return apiClient.post('/api/Apis', payload);
  },
  
  /**
   * Update an existing API monitor endpoint
   * @param {string} id - API UUID
   * @param {object} payload - Updated API Payload
   */
  updateApi: async (id, payload) => {
    return apiClient.put(`/api/Apis/${id}`, payload);
  },
  
  /**
   * Delete an API monitor endpoint
   * @param {string} id - API UUID
   */
  deleteApi: async (id) => {
    return apiClient.delete(`/api/Apis/${id}`);
  },

  /**
   * Toggle isActive status of a monitor
   * @param {string} id - Monitor UUID
   */
  toggleActive: async (id) => {
    return apiClient.put(`/api/Apis/${id}/status`);
  },

  /**
   * Get single monitor detail configuration
   * @param {string} id - Monitor UUID
   */
  getMonitorDetail: async (id) => {
    return apiClient.get(`/api/Apis/${id}`);
  },

  /**
   * Get all uptime logs for a specific user with filtering/sorting
   * @param {string} userId - User UUID
   * @param {object} params - { search, statusCode, method, sort, page, size }
   */
  getLogsByUser: async (userId, { search = '', statusCode = '', method = '', sort = '', page = 0, size = 10 } = {}) => {
    let url = `/api/uptime-logs/user/${userId}?page=${page}&size=${size}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (statusCode) url += `&statusCode=${statusCode}`;
    if (method) url += `&method=${method}`;
    if (sort) url += `&sort=${sort}`;
    return apiClient.get(url);
  },

  /**
   * Retry/Trigger manual health check for an API
   * @param {string} id - Monitor UUID
   */
  retryApi: async (id) => {
    return apiClient.post(`/api/Apis/${id}/retry`);
  },

  /**
   * Export uptime logs to CSV
   * @param {object} params - { from, to } using exact ISO 8601 formatting (YYYY-MM-DDTHH:mm:ss)
   */
  exportLogs: async ({ from, to } = {}) => {
    let url = `/api/uptime-logs/export`;
    if (from && to) {
        url += `?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    }
    return apiClient.get(url, { responseType: 'blob' });
  }
};
