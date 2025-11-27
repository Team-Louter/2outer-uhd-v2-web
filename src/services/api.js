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
    if (token && !config.headers.token) {
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
      // Note: Redirect should be handled by the component or a navigation callback
      // Direct window.location is avoided to maintain React Router compatibility
    }
    return Promise.reject(error);
  }
);

export default api;
