import axios from 'axios';
import { getToken, clearAuth } from '../utils/storage';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add authorization token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    // Only add Authorization header if custom token header is not present
    // Some endpoints require raw token in 'token' header instead of Bearer token
    if (token && !('token' in config.headers)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      clearAuth();
      // Show user-friendly message
      console.error('인증이 만료되었습니다. 다시 로그인해주세요.');
      // Redirect to login page
      if (window.location.pathname !== '/signin') {
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
