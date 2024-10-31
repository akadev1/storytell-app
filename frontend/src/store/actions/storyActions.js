import axios from 'axios';
import {
  FETCH_STORIES_SUCCESS,
  FETCH_STORIES_FAILURE,
  CREATE_STORY_SUCCESS,
  CREATE_STORY_FAILURE,
  UPDATE_STORY_SUCCESS,
  UPDATE_STORY_FAILURE,
  DELETE_STORY_SUCCESS,
  DELETE_STORY_FAILURE,
  FETCH_CHAPTERS_SUCCESS,
  FETCH_CHAPTERS_FAILURE,
  CREATE_CHAPTER_SUCCESS,
  CREATE_CHAPTER_FAILURE,
  UPDATE_CHAPTER_SUCCESS,
  UPDATE_CHAPTER_FAILURE,
  DELETE_CHAPTER_SUCCESS,
  DELETE_CHAPTER_FAILURE,
  FETCH_SCENES_SUCCESS,
  FETCH_SCENES_FAILURE,
  CREATE_SCENE_SUCCESS,
  CREATE_SCENE_FAILURE,
  UPDATE_SCENE_SUCCESS,
  UPDATE_SCENE_FAILURE,
  DELETE_SCENE_SUCCESS,
  DELETE_SCENE_FAILURE,
} from './types';

export const fetchStories = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/stories');
    dispatch({ type: FETCH_STORIES_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_STORIES_FAILURE, payload: err.response.data });
  }
};

export const createStory = (storyData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/stories', storyData);
    dispatch({ type: CREATE_STORY_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_STORY_FAILURE, payload: err.response.data });
  }
};

export const updateStory = (storyData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/stories/${storyData.id}`, storyData);
    dispatch({ type: UPDATE_STORY_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: UPDATE_STORY_FAILURE, payload: err.response.data });
  }
};

export const deleteStory = (storyId) => async (dispatch) => {
  try {
    await axios.delete(`/api/stories/${storyId}`);
    dispatch({ type: DELETE_STORY_SUCCESS, payload: storyId });
  } catch (err) {
    dispatch({ type: DELETE_STORY_FAILURE, payload: err.response.data });
  }
};

export const fetchChapters = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/chapters');
    dispatch({ type: FETCH_CHAPTERS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_CHAPTERS_FAILURE, payload: err.response.data });
  }
};

export const createChapter = (chapterData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/chapters', chapterData);
    dispatch({ type: CREATE_CHAPTER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_CHAPTER_FAILURE, payload: err.response.data });
  }
};

export const updateChapter = (chapterData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/chapters/${chapterData.id}`, chapterData);
    dispatch({ type: UPDATE_CHAPTER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: UPDATE_CHAPTER_FAILURE, payload: err.response.data });
  }
};

export const deleteChapter = (chapterId) => async (dispatch) => {
  try {
    await axios.delete(`/api/chapters/${chapterId}`);
    dispatch({ type: DELETE_CHAPTER_SUCCESS, payload: chapterId });
  } catch (err) {
    dispatch({ type: DELETE_CHAPTER_FAILURE, payload: err.response.data });
  }
};

export const fetchScenes = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/scenes');
    dispatch({ type: FETCH_SCENES_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_SCENES_FAILURE, payload: err.response.data });
  }
};

export const createScene = (sceneData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/scenes', sceneData);
    dispatch({ type: CREATE_SCENE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: CREATE_SCENE_FAILURE, payload: err.response.data });
  }
};

export const updateScene = (sceneData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/scenes/${sceneData.id}`, sceneData);
    dispatch({ type: UPDATE_SCENE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: UPDATE_SCENE_FAILURE, payload: err.response.data });
  }
};

export const deleteScene = (sceneId) => async (dispatch) => {
  try {
    await axios.delete(`/api/scenes/${sceneId}`);
    dispatch({ type: DELETE_SCENE_SUCCESS, payload: sceneId });
  } catch (err) {
    dispatch({ type: DELETE_SCENE_FAILURE, payload: err.response.data });
  }
};
