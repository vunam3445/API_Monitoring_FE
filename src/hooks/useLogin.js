import { useState } from 'react';
import { authService } from '../services/authService';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await authService.login(credentials);
      
      if (response) {
        const data = response.data || response;

        // Nếu là admin thì báo lỗi không cho dùng giao diện user
        if (data.role === 'ADMIN' || data.role === 'SUPER_ADMIN') {
            throw new Error('Thông tin đăng nhập không chính xác.');
        }

        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
        }
        
        // Save user details
        const userInfo = {
          userId: data.userId,
          email: data.email,
          fullName: data.fullName,
          avatarUrl: data.avatarUrl,
          planType: data.planType,
          role: data.role,
        };
        localStorage.setItem('user', JSON.stringify(userInfo));
      }

      setSuccess(true);
      return response;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (tokenData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await authService.googleLogin(tokenData);
      
      if (response) {
        const data = response.data || response;

        // Nếu là admin thì báo lỗi
        if (data.role === 'ADMIN' || data.role === 'SUPER_ADMIN') {
            throw new Error('Thông tin đăng nhập không chính xác.');
        }

        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
        }

        // Save user details
        const userInfo = {
          userId: data.userId,
          email: data.email,
          fullName: data.fullName,
          avatarUrl: data.avatarUrl,
          planType: data.planType,
          role: data.role,
        };
        localStorage.setItem('user', JSON.stringify(userInfo));
      }

      setSuccess(true);
      return response;
    } catch (err) {
      setError(err.message || 'Google login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, loginWithGoogle, isLoading, error, success };
};
