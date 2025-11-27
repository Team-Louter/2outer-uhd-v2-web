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
 * Get posts by user ID with detailed information
 * @param {string} userId - User ID
 * @returns {Promise}
 */
export const getPostsByUser = async (userId) => {
  const response = await api.get(`/post/user/${userId}`);
  
  // If successful, fetch detailed information for each post
  if (response.data.success && response.data.data) {
    const posts = response.data.data;
    const detailedPosts = await Promise.all(
      posts.map(async (post) => {
        try {
          const detailResponse = await api.get(`/post/id/${post.postId}`);
          if (detailResponse.data.success && detailResponse.data.data) {
            return detailResponse.data.data;
          }
          return post;
        } catch (error) {
          // If fetching details fails, return the basic post info
          console.warn(`Failed to fetch details for post ${post.postId}:`, error);
          return post;
        }
      })
    );
    return { ...response.data, data: detailedPosts };
  }
  
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
  if (postId == null) {
    console.error("deletePost: postId is undefined or null");
    throw new Error("유효하지 않은 게시글 ID입니다.");
  }

  const token = getToken();
  if (!token) {
    throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
  }
  const response = await api.delete(`/post/delete/${postId}`, {
    headers: {
      token
    },
    data: {
      postId
    }
  });
  return response.data;
};
