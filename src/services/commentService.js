import api from './api';
import { getToken } from '../utils/storage';

/**
 * Create a new comment
 * @param {object} data - { userId, postId, commentContent }
 * @returns {Promise}
 */
export const createComment = async (data) => {
  const response = await api.post('/comment', data);
  return response.data;
};

/**
 * Get a comment by ID
 * @param {number} commentId - Comment ID
 * @returns {Promise}
 */
export const getCommentById = async (commentId) => {
  const response = await api.get(`/comment/${commentId}`);
  return response.data;
};

/**
 * Get all comments for a post
 * @param {number} postId - Post ID
 * @returns {Promise}
 */
export const getCommentsByPost = async (postId) => {
  const response = await api.get(`/comment/post/${postId}`);
  return response.data;
};

/**
 * Get comment count for a post
 * @param {number} postId - Post ID
 * @returns {Promise}
 */
export const getCommentCountByPost = async (postId) => {
  const response = await api.get(`/comment/post/${postId}/count`);
  return response.data;
};

/**
 * Get all comments by a user
 * @param {string} userId - User ID
 * @returns {Promise}
 */
export const getCommentsByUser = async (userId) => {
  const response = await api.get(`/comment/user/${userId}`);
  return response.data;
};

/**
 * Update a comment
 * @param {number} commentId - Comment ID
 * @param {object} data - { commentId, commentContent }
 * @returns {Promise}
 */
export const updateComment = async (commentId, data) => {
  const token = getToken();
  if (!token) {
    throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
  }
  const response = await api.put(`/comment/update/${commentId}`, data, {
    headers: {
      token
    }
  });
  return response.data;
};

/**
 * Delete a comment (user)
 * @param {number} commentId - Comment ID
 * @param {string} userId - User ID
 * @returns {Promise}
 */
export const deleteComment = async (commentId, userId) => {
  const response = await api.delete(`/comment/${commentId}`, {
    data: { commentId, userId }
  });
  return response.data;
};

/**
 * Delete a comment (admin)
 * @param {number} commentId - Comment ID
 * @returns {Promise}
 */
export const deleteCommentAdmin = async (commentId) => {
  const response = await api.delete(`/comment/admin/${commentId}`, {
    data: { commentId }
  });
  return response.data;
};
