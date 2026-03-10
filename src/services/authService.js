import { apiClient } from './apiClient';

export const authService = {
  register: async (userData) => {
    return apiClient.post('api/auth/register', userData);
  },
  login: async (credentials) => {
    return apiClient.post('api/auth/login', credentials);
  },
  googleLogin: async (data) => {
    return apiClient.post('api/auth/google', data);
  },
};
