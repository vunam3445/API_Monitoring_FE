import { apiClient } from './apiClient';

/**
 * Service to handle user settings operations
 */
class UserSettingsService {
    /**
     * Get user settings by ID
     * @param {string} userId - The user ID
     * @returns {Promise<Object>} The user settings data
     */
    async getUserSettings(userId) {
        try {
            const response = await apiClient.get(`/api/user-settings/${userId}`);
            return response.data || response;
        } catch (error) {
            console.error('Error fetching user settings:', error);
            throw error;
        }
    }

    /**
     * Update user settings
     * @param {string} userId - The user ID
     * @param {Object} settings - The settings to update
     * @returns {Promise<Object>} The updated settings data
     */
    async updateUserSettings(userId, settings) {
        try {
            const response = await apiClient.put(`/api/user-settings/${userId}`, settings);
            return response.data || response;
        } catch (error) {
            console.error('Error updating user settings:', error);
            throw error;
        }
    }
}

export const userSettingsService = new UserSettingsService();
