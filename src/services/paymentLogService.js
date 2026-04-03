import { apiClient } from './apiClient';

/**
 * Service handling all payment log related API calls
 */
export const paymentLogService = {
  /**
   * Get all payment logs for the current user (paginated)
   * @param {number} page - Page number (starting from 0)
   * @param {number} size - Number of items per page
   * @param {string} sort - Sort field (e.g., 'createdAt,desc')
   * @returns {Promise<{content: Array, totalPages: number, totalElements: number, size: number, number: number}>}
   */
  getPaymentLogs: async (page = 0, size = 10, sort = 'createdAt,desc') => {
    return await apiClient.get('/api/payment-logs', {
      params: { page, size, sort }
    });
  },

  /**
   * Get detailed information of a specific payment log
   * @param {string|number} id - The ID of the payment log
   * @returns {Promise<Object>}
   */
  getPaymentLogByDetails: async (id) => {
    return await apiClient.get(`/api/payment-logs/${id}`);
  }
};
