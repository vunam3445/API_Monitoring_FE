import { apiClient } from './apiClient';

/**
 * User Service
 * Handles all user related API calls
 */
export const userService = {
  /**
   * Get user profile by ID
   * @param {string} id - The user UUID
   * @returns {Promise<Object>} - User profile data
   */
  getUserProfile: async (id) => {
    return apiClient.get(`api/users/${id}`);
  },

  /**
   * Update user profile
   * @param {string} id - The user UUID
   * @param {Object} userData - Data to update
   * @returns {Promise<Object>} - Updated user profile
   */
  updateUserProfile: async (id, userData) => {
    return apiClient.put(`api/users/${id}`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};
