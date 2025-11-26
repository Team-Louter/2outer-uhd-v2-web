import api from './api';

/**
 * User signup
 * @param {object} data - { userId, userPassword, userName, userEmail }
 * @returns {Promise}
 */
export const signup = async (data) => {
  const response = await api.post('/auth/signup', data);
  return response.data;
};

/**
 * User login
 * @param {object} data - { userId, userPassword }
 * @returns {Promise}
 */
export const login = async (data) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

/**
 * Send email verification code
 * @param {object} data - { userEmail, purpose: "SIGN_UP" }
 * @returns {Promise}
 */
export const sendEmailVerification = async (data) => {
  const response = await api.post('/auth/email/send', data);
  return response.data;
};

/**
 * Verify email code
 * @param {object} data - { userEmail, code, purpose: "SIGN_UP" }
 * @returns {Promise}
 */
export const verifyEmail = async (data) => {
  const response = await api.post('/auth/email/verify', data);
  return response.data;
};

/**
 * Update user password
 * @param {object} data - { userId, userPassword }
 * @returns {Promise}
 */
export const updatePassword = async (data) => {
  const response = await api.patch('/auth/update/pw', data);
  return response.data;
};
