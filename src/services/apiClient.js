import axios from 'axios';

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN || 'http://localhost:8080/';

export const apiClient = axios.create({
  baseURL: API_DOMAIN,
  withCredentials: true, // Important for sending/receiving HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

export const parseJwt = (token) => {
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

const redirectToLogin = () => {
  const token = localStorage.getItem('accessToken');
  let isAdmin = false;

  if (token) {
    const decoded = parseJwt(token);
    if (decoded && (decoded.role === 'ADMIN' || decoded.role === 'SUPER_ADMIN')) {
      isAdmin = true;
    }
  }

  localStorage.removeItem('accessToken');
  window.location.href = isAdmin ? '/admin/login' : '/';
};

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Interceptor for requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for responses
apiClient.interceptors.response.use(
  (response) => {
    return response.data; // Return only data part
  },
  async (error) => {
    const originalRequest = error.config;

    // Determine error message formatting globally
    let message = 'Something went wrong';
    if (error.response && error.response.data) {
      const data = error.response.data;
      if (typeof data === 'string') {
        message = data;
      } else if (data.message) {
        message = data.message;
      } else if (data.error) {
        message = data.error;
      } else {
        message = JSON.stringify(data);
      }
    } else if (error.message) {
      message = error.message;
    }

    // Handle 401 Unauthorized for token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      const url = originalRequest.url;

      if (url.includes('api/auth/refresh-token')) {
        // Refresh token hết hạn → xác định role và chuyển hướng đến trang login phù hợp
        redirectToLogin();
        return Promise.reject(new Error(message));
      }

      // Không tự động redirect khi gặp lỗi 401 ở các trang auth (login, register, v.v.)
      const authEndpoints = ['api/auth/login', 'api/auth/register', 'api/auth/google'];
      if (authEndpoints.some(endpoint => url.includes(endpoint))) {
        // Auth thất bại → chỉ xoá token nếu có, không redirect (để hiển thị lỗi trên form)
        localStorage.removeItem('accessToken');
        return Promise.reject(new Error(message));
      }

      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return apiClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Must use axios directly to prevent infinite interceptor loops
        const response = await axios.post(`${API_DOMAIN}api/auth/refresh-token`, {}, {
          withCredentials: true // send httponly cookie
        });
        
        // Assuming response.data has accessToken
        const newToken = response.data?.accessToken || response.data?.data?.accessToken;
        
        if (newToken) {
          localStorage.setItem('accessToken', newToken);
          apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
          originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
          processQueue(null, newToken);
          
          return apiClient(originalRequest);
        } else {
          throw new Error('No token returned');
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Refresh token hết hạn → xác định role và chuyển hướng đến trang login phù hợp
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(new Error(message));
  }
);
