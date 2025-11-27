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
    // Handle network errors (CORS, connection refused, etc.)
    if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      console.error('네트워크 오류: 서버에 연결할 수 없습니다.');
      console.error('CORS 설정을 확인하거나 서버가 실행 중인지 확인하세요.');
      // Don't clear auth for network errors - might be temporary
      return Promise.reject(new Error('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.'));
    }
    
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      clearAuth();
      console.error('인증이 만료되었습니다. 다시 로그인해주세요.');
      
      // Only redirect if not already on login page
      if (window.location.pathname !== '/signin') {
        window.location.href = '/signin';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
