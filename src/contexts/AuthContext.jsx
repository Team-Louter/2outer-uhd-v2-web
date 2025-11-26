import React, { createContext, useState, useEffect } from 'react';
import { getToken, getUser, saveToken, saveUser, clearAuth } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  /**
   * Login user and save credentials
   * @param {string} authToken - JWT token from login response
   * @param {object} userData - User data object { userId, userName }
   */
  const login = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    saveToken(authToken);
    saveUser(userData);
  };

  /**
   * Logout user and clear credentials
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    clearAuth();
  };

  /**
   * Update user data
   * @param {object} userData - Updated user data
   */
  const updateUser = (userData) => {
    setUser(userData);
    saveUser(userData);
  };

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  const isAuthenticated = () => {
    return !!token;
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    updateUser,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
