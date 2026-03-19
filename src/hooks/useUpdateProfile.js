import { useState } from 'react';
import { userService } from '../services/userService';

/**
 * Custom hook to manage user profile update logic
 */
export const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Update user profile
     * @param {string} id - The user UUID
     * @param {FormData} formData - Profile data including image
     */
    const updateProfile = async (id, formData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await userService.updateUserProfile(id, formData);
            return data.data || data;
        } catch (err) {
            console.error('Update profile error:', err);
            const message = err.message || 'Failed to update profile. Please try again.';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return { updateProfile, loading, error, setError };
};
