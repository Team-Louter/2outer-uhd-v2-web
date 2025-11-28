// localStorage utility functions for token and user management

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

/**
 * Validate token format
 * @param {string} token - Token to validate
 * @returns {boolean} - true if token is valid format
 */
export const validateToken = (token) => {
  if (!token || typeof token !== 'string') {
    console.error('Invalid token: must be a non-empty string');
    return false;
  }
  
  // Accept any non-empty string as a valid token
  // This allows for different token formats (JWT, session IDs, etc.)
  if (token.trim().length === 0) {
    console.error('Invalid token: token cannot be empty or whitespace only');
    return false;
  }
  
  return true;
};

/**
 * Save token to localStorage with validation
 * @param {string} token - Authentication token
 * @throws {Error} if token is invalid
 */
export const saveToken = (token) => {
  if (!validateToken(token)) {
    throw new Error('Cannot save invalid token');
  }
  localStorage.setItem(TOKEN_KEY, token);
  console.log('Token saved successfully');
};

/**
 * Get token from localStorage
 * @returns {string|null} - Token or null
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Save user data to localStorage
 * @param {object} user - User data object
 */
export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Get user data from localStorage
 * @returns {object|null} - User data or null
 */
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

/**
 * Remove user data from localStorage
 */
export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

/**
 * Clear all auth data from localStorage
 */
export const clearAuth = () => {
  removeToken();
  removeUser();
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getToken();
};
