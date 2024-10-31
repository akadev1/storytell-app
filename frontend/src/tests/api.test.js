import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as api from '../utils/api';

describe('API utility functions', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('registerUser should return data when registration is successful', async () => {
    const userData = { username: 'testuser', email: 'test@example.com', password: 'password' };
    const response = { token: 'token', user: { id: '1', email: 'test@example.com' } };

    mock.onPost('/api/auth/register').reply(200, response);

    const result = await api.registerUser(userData);
    expect(result).toEqual(response);
  });

  it('registerUser should throw an error when registration fails', async () => {
    const userData = { username: 'testuser', email: 'test@example.com', password: 'password' };
    const errorResponse = { message: 'Registration failed' };

    mock.onPost('/api/auth/register').reply(400, errorResponse);

    await expect(api.registerUser(userData)).rejects.toEqual(errorResponse);
  });

  it('loginUser should return data when login is successful', async () => {
    const userData = { email: 'test@example.com', password: 'password' };
    const response = { token: 'token', user: { id: '1', email: 'test@example.com' } };

    mock.onPost('/api/auth/login').reply(200, response);

    const result = await api.loginUser(userData);
    expect(result).toEqual(response);
  });

  it('loginUser should throw an error when login fails', async () => {
    const userData = { email: 'test@example.com', password: 'password' };
    const errorResponse = { message: 'Invalid credentials' };

    mock.onPost('/api/auth/login').reply(400, errorResponse);

    await expect(api.loginUser(userData)).rejects.toEqual(errorResponse);
  });

  it('fetchStories should return data when fetching stories is successful', async () => {
    const response = [{ id: '1', title: 'Story 1' }];

    mock.onGet('/api/stories').reply(200, response);

    const result = await api.fetchStories();
    expect(result).toEqual(response);
  });

  it('fetchStories should throw an error when fetching stories fails', async () => {
    const errorResponse = { message: 'Failed to fetch stories' };

    mock.onGet('/api/stories').reply(400, errorResponse);

    await expect(api.fetchStories()).rejects.toEqual(errorResponse);
  });

  it('createStory should return data when creating a story is successful', async () => {
    const storyData = { title: 'New Story' };
    const response = { id: '1', title: 'New Story' };

    mock.onPost('/api/stories').reply(200, response);

    const result = await api.createStory(storyData);
    expect(result).toEqual(response);
  });

  it('createStory should throw an error when creating a story fails', async () => {
    const storyData = { title: 'New Story' };
    const errorResponse = { message: 'Failed to create story' };

    mock.onPost('/api/stories').reply(400, errorResponse);

    await expect(api.createStory(storyData)).rejects.toEqual(errorResponse);
  });

  it('updateStory should return data when updating a story is successful', async () => {
    const storyId = '1';
    const storyData = { title: 'Updated Story' };
    const response = { id: '1', title: 'Updated Story' };

    mock.onPut(`/api/stories/${storyId}`).reply(200, response);

    const result = await api.updateStory(storyId, storyData);
    expect(result).toEqual(response);
  });

  it('updateStory should throw an error when updating a story fails', async () => {
    const storyId = '1';
    const storyData = { title: 'Updated Story' };
    const errorResponse = { message: 'Failed to update story' };

    mock.onPut(`/api/stories/${storyId}`).reply(400, errorResponse);

    await expect(api.updateStory(storyId, storyData)).rejects.toEqual(errorResponse);
  });

  it('deleteStory should return data when deleting a story is successful', async () => {
    const storyId = '1';
    const response = { message: 'Story deleted successfully' };

    mock.onDelete(`/api/stories/${storyId}`).reply(200, response);

    const result = await api.deleteStory(storyId);
    expect(result).toEqual(response);
  });

  it('deleteStory should throw an error when deleting a story fails', async () => {
    const storyId = '1';
    const errorResponse = { message: 'Failed to delete story' };

    mock.onDelete(`/api/stories/${storyId}`).reply(400, errorResponse);

    await expect(api.deleteStory(storyId)).rejects.toEqual(errorResponse);
  });

  it('createChapter should return data when creating a chapter is successful', async () => {
    const storyId = '1';
    const chapterData = { title: 'New Chapter' };
    const response = { id: '1', title: 'New Chapter' };

    mock.onPost(`/api/stories/${storyId}/chapters`).reply(200, response);

    const result = await api.createChapter(storyId, chapterData);
    expect(result).toEqual(response);
  });

  it('createChapter should throw an error when creating a chapter fails', async () => {
    const storyId = '1';
    const chapterData = { title: 'New Chapter' };
    const errorResponse = { message: 'Failed to create chapter' };

    mock.onPost(`/api/stories/${storyId}/chapters`).reply(400, errorResponse);

    await expect(api.createChapter(storyId, chapterData)).rejects.toEqual(errorResponse);
  });

  it('createScene should return data when creating a scene is successful', async () => {
    const storyId = '1';
    const chapterId = '1';
    const sceneData = { title: 'New Scene' };
    const response = { id: '1', title: 'New Scene' };

    mock.onPost(`/api/stories/${storyId}/chapters/${chapterId}/scenes`).reply(200, response);

    const result = await api.createScene(storyId, chapterId, sceneData);
    expect(result).toEqual(response);
  });

  it('createScene should throw an error when creating a scene fails', async () => {
    const storyId = '1';
    const chapterId = '1';
    const sceneData = { title: 'New Scene' };
    const errorResponse = { message: 'Failed to create scene' };

    mock.onPost(`/api/stories/${storyId}/chapters/${chapterId}/scenes`).reply(400, errorResponse);

    await expect(api.createScene(storyId, chapterId, sceneData)).rejects.toEqual(errorResponse);
  });
});
