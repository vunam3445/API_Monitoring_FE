import { useState, useEffect, useCallback } from 'react';
import { userSettingsService } from '../services/userSettingsService';
import { useUser } from './useUser';

/**
 * Custom hook to manage user settings state and operations
 * @returns {Object} { settings, loading, isUpdating, error, updateSettings, refresh }
 */
export const useUserSettings = () => {
    const { user } = useUser();
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    // Get current user ID
    const userId = user?.userId || user?.id || user?.sub;

    /**
     * Fetch settings from API
     */
    const fetchSettings = useCallback(async () => {
        if (!userId) return;
        
        setLoading(true);
        setError(null);
        try {
            const data = await userSettingsService.getUserSettings(userId);
            setSettings(data);
        } catch (err) {
            console.error('Failed to fetch settings:', err);
            setError(err.message || 'Không thể tải cài đặt người dùng');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    /**
     * Update settings to API
     * @param {Object} updatedSettings - The data to update
     */
    const updateSettings = async (updatedSettings) => {
        if (!userId) {
            throw new Error('Không tìm thấy ID người dùng');
        }

        setIsUpdating(true);
        try {
            const data = await userSettingsService.updateUserSettings(userId, updatedSettings);
            setSettings(data);
            return data;
        } catch (err) {
            console.error('Failed to update settings:', err);
            throw err;
        } finally {
            setIsUpdating(false);
        }
    };

    // Initial fetch when userId is available
    useEffect(() => {
        if (userId) {
            fetchSettings();
        }
    }, [userId, fetchSettings]);

    return {
        settings,
        loading,
        isUpdating,
        error,
        updateSettings,
        refresh: fetchSettings,
        setSettings // Expose setSettings for local state management in forms
    };
};
