import api from './api';
import { getToken } from '../utils/storage';

/**
 * Create a new post
 * @param {object} data - { userId, postTitle, postContent, postImage, postStatus: "FIND" | "LOST" }
 * @returns {Promise}
 */
export const createPost = async (data) => {
  const response = await api.post('/post/create', data);
  return response.data;
};

/**
 * Update an existing post
 * @param {number} postId - Post ID
 * @param {object} data - { userId, postTitle, postContent, postImage, status: "FIND" | "LOST" }
 * @returns {Promise}
 */
export const updatePost = async (postId, data) => {
  const response = await api.put(`/post/update/${postId}`, data);
  return response.data;
};

/**
 * Get all posts
 * @returns {Promise}
 */
export const getAllPosts = async () => {
  const response = await api.get('/post/find/all');
  return response.data;
};

/**
 * Get posts by status (FIND or LOST)
 * @param {string} status - "FIND" or "LOST"
 * @returns {Promise}
 */
export const getPostsByStatus = async (status) => {
  const response = await api.get(`/post/status/${status}`);
  return response.data;
};

/**
 * Get post by ID
 * @param {number} postId - Post ID
 * @returns {Promise}
 */
export const getPostById = async (postId) => {
  const response = await api.get(`/post/id/${postId}`);
  return response.data;
};

/**
 * Get post by title
 * @param {string} postTitle - Post title
 * @returns {Promise}
 */
export const getPostByTitle = async (postTitle) => {
  const response = await api.get(`/post/title/${encodeURIComponent(postTitle)}`);
  return response.data;
};

/**
 * Get posts by user ID
 * @param {string} userId - User ID
 * @returns {Promise}
 */
export const getPostsByUser = async (userId) => {
  const response = await api.get(`/post/user/${userId}`);
  return response.data;
};

/**
 * Search posts by keyword
 * @param {string} keyword - Search keyword
 * @returns {Promise}
 */
export const searchPosts = async (keyword) => {
  const response = await api.get(`/post/search?keyword=${encodeURIComponent(keyword)}`);
  return response.data;
};

/**
 * Delete a post
 * @param {number} postId - Post ID
 * @returns {Promise}
 */
export const deletePost = async (postId) => {
  if (postId === undefined || postId === null) {
    console.error("deletePost: postId is undefined or null");
    throw new Error("유효하지 않은 게시글 ID입니다.");
  }

  const token = getToken();
  const response = await api.delete(`/post/delete/${postId}`, {
    data: {
      header: { token },
      body: { postId }
    }
  });
  return response.data;
};
