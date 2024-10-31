import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchStories = async () => {
  try {
    const response = await api.get('/stories');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createStory = async (storyData) => {
  try {
    const response = await api.post('/stories', storyData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateStory = async (storyId, storyData) => {
  try {
    const response = await api.put(`/stories/${storyId}`, storyData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteStory = async (storyId) => {
  try {
    const response = await api.delete(`/stories/${storyId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createChapter = async (storyId, chapterData) => {
  try {
    const response = await api.post(`/stories/${storyId}/chapters`, chapterData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createScene = async (storyId, chapterId, sceneData) => {
  try {
    const response = await api.post(`/stories/${storyId}/chapters/${chapterId}/scenes`, sceneData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
