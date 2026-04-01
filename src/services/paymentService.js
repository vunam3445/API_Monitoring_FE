import { apiClient } from './apiClient';

/**
 * Service handling all payment related API calls
 */
export const paymentService = {
  /**
   * Create a VNPay payment URL for a specific subscription plan
   * @param {string} planId - UUID of the plan
   * @param {string} bankCode - Optional bank code (NCB, VNPAYQR, etc.)
   * @returns {Promise<{paymentUrl: string}>}
   */
  createPaymentUrl: async (planId, bankCode = "") => {
    return await apiClient.post('/api/payment/create-url', {
      planId,
      bankCode
    });
  },
  
  /**
   * Send the return parameters back to backend for verification
   * @param {string} queryString - Full query string from redirect URL
   * @returns {Promise<{success: boolean, message: string}>}
   */
  handleVNPayReturn: async (queryString) => {
    return await apiClient.get(`/api/payment/vnpay-return${queryString}`);
  },

  /**
   * Subscribe to a free plan directly without payment gateway
   * @param {string} planId - UUID of the plan
   * @returns {Promise<{success: boolean, message: string}>}
   */
  subscribeFree: async (planId) => {
    return await apiClient.post('/api/subscriptions/free-subscribe', { planId });
  }
};
