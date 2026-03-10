import { useState } from 'react';
import { authService } from '../services/authService';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await authService.register(userData);
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error, success };
};
