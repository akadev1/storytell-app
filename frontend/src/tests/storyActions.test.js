import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from '../store/actions/storyActions';
import * as types from '../store/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('storyActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    mock.reset();
  });

  it('creates FETCH_STORIES_SUCCESS when fetching stories is successful', async () => {
    const response = [{ id: '1', title: 'Story 1' }];
    mock.onGet('/api/stories').reply(200, response);

    const expectedActions = [
      { type: types.FETCH_STORIES_SUCCESS, payload: response },
    ];

    await store.dispatch(actions.fetchStories());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_STORIES_FAILURE when fetching stories fails', async () => {
    const errorResponse = { message: 'Failed to fetch stories' };
    mock.onGet('/api/stories').reply(400, errorResponse);

    const expectedActions = [
      { type: types.FETCH_STORIES_FAILURE, payload: errorResponse },
    ];

    await store.dispatch(actions.fetchStories());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates CREATE_STORY_SUCCESS when creating a story is successful', async () => {
    const storyData = { title: 'New Story' };
    const response = { id: '1', title: 'New Story' };
    mock.onPost('/api/stories').reply(200, response);

    const expectedActions = [
      { type: types.CREATE_STORY_SUCCESS, payload: response },
    ];

    await store.dispatch(actions.createStory(storyData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates CREATE_STORY_FAILURE when creating a story fails', async () => {
    const storyData = { title: 'New Story' };
    const errorResponse = { message: 'Failed to create story' };
    mock.onPost('/api/stories').reply(400, errorResponse);

    const expectedActions = [
      { type: types.CREATE_STORY_FAILURE, payload: errorResponse },
    ];

    await store.dispatch(actions.createStory(storyData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates UPDATE_STORY_SUCCESS when updating a story is successful', async () => {
    const storyData = { id: '1', title: 'Updated Story' };
    const response = { id: '1', title: 'Updated Story' };
    mock.onPut(`/api/stories/${storyData.id}`).reply(200, response);

    const expectedActions = [
      { type: types.UPDATE_STORY_SUCCESS, payload: response },
    ];

    await store.dispatch(actions.updateStory(storyData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates UPDATE_STORY_FAILURE when updating a story fails', async () => {
    const storyData = { id: '1', title: 'Updated Story' };
    const errorResponse = { message: 'Failed to update story' };
    mock.onPut(`/api/stories/${storyData.id}`).reply(400, errorResponse);

    const expectedActions = [
      { type: types.UPDATE_STORY_FAILURE, payload: errorResponse },
    ];

    await store.dispatch(actions.updateStory(storyData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates DELETE_STORY_SUCCESS when deleting a story is successful', async () => {
    const storyId = '1';
    mock.onDelete(`/api/stories/${storyId}`).reply(200);

    const expectedActions = [
      { type: types.DELETE_STORY_SUCCESS, payload: storyId },
    ];

    await store.dispatch(actions.deleteStory(storyId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates DELETE_STORY_FAILURE when deleting a story fails', async () => {
    const storyId = '1';
    const errorResponse = { message: 'Failed to delete story' };
    mock.onDelete(`/api/stories/${storyId}`).reply(400, errorResponse);

    const expectedActions = [
      { type: types.DELETE_STORY_FAILURE, payload: errorResponse },
    ];

    await store.dispatch(actions.deleteStory(storyId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_CHAPTERS_SUCCESS when fetching chapters is successful', async () => {
    const response = [{ id: '1', title: 'Chapter 1' }];
    mock.onGet('/api/chapters').reply(200, response);

    const expectedActions = [
      { type: types.FETCH_CHAPTERS_SUCCESS, payload: response },
    ];

    await store.dispatch(actions.fetchChapters());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_CHAPTERS_FAILURE when fetching chapters fails', async () => {
    const errorResponse = { message: 'Failed to fetch chapters' };
    mock.onGet('/api/chapters').reply(400, errorResponse);

    const expectedActions = [
      { type: types.FETCH_CHAPTERS_FAILURE, payload: errorResponse },
    ];

    await store.dispatch(actions.fetchChapters());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates CREATE_CHAPTER_SUCCESS when creating a chapter is successful', async () => {
    const chapterData = { title: 'New Chapter' };
    const response = { id: '1', title: 'New Chapter' };
    mock.onPost('/api/chapters').reply(200, response);

    const expectedActions = [
      { type: types.CREATE_CHAPTER_SUCCESS, payload: response },
    ];

    await store.dispatch(actions.createChapter(chapterData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates CREATE_CHAPTER_FAILURE when creating a chapter fails', async () => {
    const chapterData = { title: 'New Chapter' };
    const errorResponse = { message: 'Failed to create chapter' };
    mock.onPost('/api/chapters').reply(400, errorResponse);

    const expectedActions = [
      { type: types.CREATE_CHAPTER_FAILURE, payload: errorResponse },
    ];

    await store.dispatch(actions.createChapter(chapterData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates UPDATE_CHAPTER_SUCCESS when updating a chapter is successful', async () => {
    const chapterData = { id: '1', title: 'Updated Chapter' };
    const response = { id: '1', title: 'Updated Chapter' };
    mock.onPut(`/api/chapters/${chapterData.id}`).reply(200, response);

    const expectedActions = [
      { type: types.UPDATE_CHAPTER_SUCCESS, payload: response },
    ];

    await store.dispatch(actions.updateChapter(chapterData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates UPDATE_CHAPTER_FAILURE when updating a chapter fails', async () => {
    const chapterData = { id: '1', title: 'Updated Chapter' };
    const errorResponse = { message: 'Failed to update chapter' };
    mock.onPut(`/api/chapters/${chapterData.id}`).reply(400, errorResponse);

    const expectedActions = [
      { type: types.UPDATE_CHAPTER_FAILURE, payload: errorResponse },
    ];

    await store.dispatch(actions.updateChapter(chapterData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates DELETE_CHAPTER_SUCCESS when deleting a chapter is successful', async () => {
    const chapterId = '1';
    mock.onDelete(`/api/chapters/${chapterId}`).reply(200);

    const expectedActions = [
      { type: types.DELETE_CHAPTER_SUCCESS, payload: chapterId },
    ];

    await store.dispatch(actions.deleteChapter(chapterId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates DELETE_CHAPTER_FAILURE when deleting a chapter fails', async () => {
    const chapterId = '1';
    const errorResponse = { message: 'Failed to delete chapter' };
    mock.onDelete(`/api/chapters/${chapterId}`).reply(400, errorResponse);

    const expectedActions = [
      { type: types.DELETE_CHAPTER_FAILURE, payload: errorResponse },
    ];

    await store.dispatch(actions.deleteChapter(chapterId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_SCENES_SUCCESS when fetching scenes is successful', async () => {
    const response = [{ id: '1', title: 'Scene 1' }];
    mock.onGet('/api/scenes').reply(200, response);

    const expectedActions = [
      { type: types.FETCH_SCENES_SUCCESS, payload: response },
    ];

    await store.dispatch(actions.fetchScenes());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_SCENES_FAILURE when fetching scenes fails', async () => {
    const errorResponse = { message: 'Failed to fetch scenes' };
    mock.onGet('/api/scenes').reply(400, errorResponse);

    const expectedActions = [
      { type: types.FETCH_SCENES_FAILURE, payload: errorResponse },
    ];

    await store.dispatch(actions.fetchScenes());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates CREATE_SCENE_SUCCESS when creating a scene is successful', async () => {
    const sceneData = { title: 'New Scene' };
    const response = { id: '1', title: 'New Scene' };
    mock.onPost('/api/scenes').reply(200, response);

    const expectedActions = [
      { type: types.CREATE_SCENE_SUCCESS, payload: response },
    ];

    await store.dispatch(actions.createScene(sceneData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates CREATE_SCENE_FAILURE when creating a scene fails', async () => {
    const sceneData = { title: 'New Scene' };
    const errorResponse = { message: 'Failed to create scene' };
    mock.onPost('/api/scenes').reply(400, errorResponse);

    const expectedActions = [
      { type: types.CREATE_SCENE_FAILURE, payload: errorResponse },
    ];

    await store.dispatch(actions.createScene(sceneData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates UPDATE_SCENE_SUCCESS when updating a scene is successful', async () => {
    const sceneData = { id: '1', title: 'Updated Scene' };
    const response = { id: '1', title: 'Updated Scene' };
    mock.onPut(`/api/scenes/${sceneData.id}`).reply(200, response);

    const expectedActions = [
      { type: types.UPDATE_SCENE_SUCCESS, payload: response },
    ];

    await store.dispatch(actions.updateScene(sceneData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates UPDATE_SCENE_FAILURE when updating a scene fails', async () => {
    const sceneData = { id: '1', title: 'Updated Scene' };
    const errorResponse = { message: 'Failed to update scene' };
    mock.onPut(`/api/scenes/${sceneData.id}`).reply(400, errorResponse);

    const expectedActions = [
      { type: types.UPDATE_SCENE_FAILURE, payload: errorResponse },
    ];

    await store.dispatch(actions.updateScene(sceneData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates DELETE_SCENE_SUCCESS when deleting a scene is successful', async () => {
    const sceneId = '1';
    mock.onDelete(`/api/scenes/${sceneId}`).reply(200);

    const expectedActions = [
      { type: types.DELETE_SCENE_SUCCESS, payload: sceneId },
    ];

    await store.dispatch(actions.deleteScene(sceneId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates DELETE_SCENE_FAILURE when deleting a scene fails', async () => {
    const sceneId = '1';
    const errorResponse = { message: 'Failed to delete scene' };
    mock.onDelete(`/api/scenes/${sceneId}`).reply(400, errorResponse);

    const expectedActions = [
      { type: types.DELETE_SCENE_FAILURE, payload: errorResponse },
    ];

    await store.dispatch(actions.deleteScene(sceneId));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
