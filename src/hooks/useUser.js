import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

/**
 * Helper to parse JWT and extract user ID
 */
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

/**
 * Custom hook to fetch and manage user profile data
 */
export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Access token not found');
      }

      const decoded = parseJwt(token);
      // ID fields in tokens are usually 'id', 'sub', or 'userId'
      // Given your backend configuration, 'userId' contains the ID and 'sub' contains the email.
      const userId = decoded?.userId || decoded?.id || decoded?.sub;

      if (!userId) {
        throw new Error('User ID not found in token');
      }

      const data = await userService.getUserProfile(userId);
      // Handle both direct data or wrapped data based on apiClient logic
      const userData = data.data || data;
      setUser(userData);
      
      // Sync with localStorage 'user' if needed
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (userData) {
        localStorage.setItem('user', JSON.stringify({ ...storedUser, ...userData }));
      }
      
      setError(null);
      return userData;
    } catch (err) {
      console.error('Error fetching user:', err);
      setError(err.message || 'Failed to load user profile');
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error, refresh: fetchUser };
};
