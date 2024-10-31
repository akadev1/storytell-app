import storyReducer from '../store/reducers/storyReducer';
import * as types from '../store/actions/types';

describe('storyReducer', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(storyReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_STORIES_SUCCESS', () => {
    const action = {
      type: types.FETCH_STORIES_SUCCESS,
      payload: [{ id: '1', title: 'Story 1' }],
    };

    const expectedState = {
      items: [{ id: '1', title: 'Story 1' }],
      loading: false,
      error: null,
    };

    expect(storyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_STORIES_FAILURE', () => {
    const action = {
      type: types.FETCH_STORIES_FAILURE,
      payload: { message: 'Failed to fetch stories' },
    };

    const expectedState = {
      items: [],
      loading: false,
      error: { message: 'Failed to fetch stories' },
    };

    expect(storyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_STORY_SUCCESS', () => {
    const action = {
      type: types.CREATE_STORY_SUCCESS,
      payload: { id: '1', title: 'New Story' },
    };

    const expectedState = {
      items: [{ id: '1', title: 'New Story' }],
      loading: false,
      error: null,
    };

    expect(storyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_STORY_FAILURE', () => {
    const action = {
      type: types.CREATE_STORY_FAILURE,
      payload: { message: 'Failed to create story' },
    };

    const expectedState = {
      items: [],
      loading: false,
      error: { message: 'Failed to create story' },
    };

    expect(storyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_STORY_SUCCESS', () => {
    const initialStateWithStory = {
      items: [{ id: '1', title: 'Old Story' }],
      loading: false,
      error: null,
    };

    const action = {
      type: types.UPDATE_STORY_SUCCESS,
      payload: { id: '1', title: 'Updated Story' },
    };

    const expectedState = {
      items: [{ id: '1', title: 'Updated Story' }],
      loading: false,
      error: null,
    };

    expect(storyReducer(initialStateWithStory, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_STORY_FAILURE', () => {
    const action = {
      type: types.UPDATE_STORY_FAILURE,
      payload: { message: 'Failed to update story' },
    };

    const expectedState = {
      items: [],
      loading: false,
      error: { message: 'Failed to update story' },
    };

    expect(storyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_STORY_SUCCESS', () => {
    const initialStateWithStory = {
      items: [{ id: '1', title: 'Story to be deleted' }],
      loading: false,
      error: null,
    };

    const action = {
      type: types.DELETE_STORY_SUCCESS,
      payload: '1',
    };

    const expectedState = {
      items: [],
      loading: false,
      error: null,
    };

    expect(storyReducer(initialStateWithStory, action)).toEqual(expectedState);
  });

  it('should handle DELETE_STORY_FAILURE', () => {
    const action = {
      type: types.DELETE_STORY_FAILURE,
      payload: { message: 'Failed to delete story' },
    };

    const expectedState = {
      items: [],
      loading: false,
      error: { message: 'Failed to delete story' },
    };

    expect(storyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_CHAPTERS_SUCCESS', () => {
    const initialStateWithStory = {
      items: [{ id: '1', title: 'Story 1', chapters: [] }],
      loading: false,
      error: null,
    };

    const action = {
      type: types.FETCH_CHAPTERS_SUCCESS,
      payload: { storyId: '1', chapters: [{ id: '1', title: 'Chapter 1' }] },
    };

    const expectedState = {
      items: [{ id: '1', title: 'Story 1', chapters: [{ id: '1', title: 'Chapter 1' }] }],
      loading: false,
      error: null,
    };

    expect(storyReducer(initialStateWithStory, action)).toEqual(expectedState);
  });

  it('should handle FETCH_CHAPTERS_FAILURE', () => {
    const action = {
      type: types.FETCH_CHAPTERS_FAILURE,
      payload: { message: 'Failed to fetch chapters' },
    };

    const expectedState = {
      items: [],
      loading: false,
      error: { message: 'Failed to fetch chapters' },
    };

    expect(storyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_CHAPTER_SUCCESS', () => {
    const initialStateWithStory = {
      items: [{ id: '1', title: 'Story 1', chapters: [] }],
      loading: false,
      error: null,
    };

    const action = {
      type: types.CREATE_CHAPTER_SUCCESS,
      payload: { storyId: '1', chapter: { id: '1', title: 'New Chapter' } },
    };

    const expectedState = {
      items: [{ id: '1', title: 'Story 1', chapters: [{ id: '1', title: 'New Chapter' }] }],
      loading: false,
      error: null,
    };

    expect(storyReducer(initialStateWithStory, action)).toEqual(expectedState);
  });

  it('should handle CREATE_CHAPTER_FAILURE', () => {
    const action = {
      type: types.CREATE_CHAPTER_FAILURE,
      payload: { message: 'Failed to create chapter' },
    };

    const expectedState = {
      items: [],
      loading: false,
      error: { message: 'Failed to create chapter' },
    };

    expect(storyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_CHAPTER_SUCCESS', () => {
    const initialStateWithStory = {
      items: [{ id: '1', title: 'Story 1', chapters: [{ id: '1', title: 'Old Chapter' }] }],
      loading: false,
      error: null,
    };

    const action = {
      type: types.UPDATE_CHAPTER_SUCCESS,
      payload: { storyId: '1', chapter: { id: '1', title: 'Updated Chapter' } },
    };

    const expectedState = {
      items: [{ id: '1', title: 'Story 1', chapters: [{ id: '1', title: 'Updated Chapter' }] }],
      loading: false,
      error: null,
    };

    expect(storyReducer(initialStateWithStory, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_CHAPTER_FAILURE', () => {
    const action = {
      type: types.UPDATE_CHAPTER_FAILURE,
      payload: { message: 'Failed to update chapter' },
    };

    const expectedState = {
      items: [],
      loading: false,
      error: { message: 'Failed to update chapter' },
    };

    expect(storyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_CHAPTER_SUCCESS', () => {
    const initialStateWithStory = {
      items: [{ id: '1', title: 'Story 1', chapters: [{ id: '1', title: 'Chapter to be deleted' }] }],
      loading: false,
      error: null,
    };

    const action = {
      type: types.DELETE_CHAPTER_SUCCESS,
      payload: { storyId: '1', chapterId: '1' },
    };

    const expectedState = {
      items: [{ id: '1', title: 'Story 1', chapters: [] }],
      loading: false,
      error: null,
    };

    expect(storyReducer(initialStateWithStory, action)).toEqual(expectedState);
  });

  it('should handle DELETE_CHAPTER_FAILURE', () => {
    const action = {
      type: types.DELETE_CHAPTER_FAILURE,
      payload: { message: 'Failed to delete chapter' },
    };

    const expectedState = {
      items: [],
      loading: false,
      error: { message: 'Failed to delete chapter' },
    };

    expect(storyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_SCENES_SUCCESS', () => {
    const initialStateWithStory = {
      items: [{ id: '1', title: 'Story 1', chapters: [{ id: '1', title: 'Chapter 1', scenes: [] }] }],
      loading: false,
      error: null,
    };

    const action = {
      type: types.FETCH_SCENES_SUCCESS,
      payload: { storyId: '1', chapterId: '1', scenes: [{ id: '1', title: 'Scene 1' }] },
    };

    const expectedState = {
      items: [{ id: '1', title: 'Story 1', chapters: [{ id: '1', title: 'Chapter 1', scenes: [{ id: '1', title: 'Scene 1' }] }] }],
      loading: false,
      error: null,
    };

    expect(storyReducer(initialStateWithStory, action)).toEqual(expectedState);
  });

  it('should handle FETCH_SCENES_FAILURE', () => {
    const action = {
      type: types.FETCH_SCENES_FAILURE,
      payload: { message: 'Failed to fetch scenes' },
    };

    const expectedState = {
      items: [],
      loading: false,
      error: { message: 'Failed to fetch scenes' },
    };

    expect(storyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_SCENE_SUCCESS', () => {
    const initialStateWithStory = {
      items: [{ id: '1', title: 'Story 1', chapters: [{ id: '1', title: 'Chapter 1', scenes: [] }] }],
      loading: false,
      error: null,
    };

    const action = {
      type: types.CREATE_SCENE_SUCCESS,
      payload: { storyId: '1', chapterId: '1', scene: { id: '1', title: 'New Scene' } },
    };

    const expectedState = {
      items: [{ id: '1', title: 'Story 1', chapters: [{ id: '1', title: 'Chapter 1', scenes: [{ id: '1', title: 'New Scene' }] }] }],
      loading: false,
      error: null,
    };

    expect(storyReducer(initialStateWithStory, action)).toEqual(expectedState);
  });

  it('should handle CREATE_SCENE_FAILURE', () => {
    const action = {
      type: types.CREATE_SCENE_FAILURE,
      payload: { message: 'Failed to create scene' },
    };

    const expectedState = {
      items: [],
      loading: false,
      error: { message: 'Failed to create scene' },
    };

    expect(storyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_SCENE_SUCCESS', () => {
    const initialStateWithStory = {
      items: [{ id: '1', title: 'Story 1', chapters: [{ id: '1', title: 'Chapter 1', scenes: [{ id: '1', title: 'Old Scene' }] }] }],
      loading: false,
      error: null,
    };

    const action = {
      type: types.UPDATE_SCENE_SUCCESS,
      payload: { storyId: '1', chapterId: '1', scene: { id: '1', title: 'Updated Scene' } },
    };

    const expectedState = {
      items: [{ id: '1', title: 'Story 1', chapters: [{ id: '1', title: 'Chapter 1', scenes: [{ id: '1', title: 'Updated Scene' }] }] }],
      loading: false,
      error: null,
    };

    expect(storyReducer(initialStateWithStory, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_SCENE_FAILURE', () => {
    const action = {
      type: types.UPDATE_SCENE_FAILURE,
      payload: { message: 'Failed to update scene' },
    };

    const expectedState = {
      items: [],
      loading: false,
      error: { message: 'Failed to update scene' },
    };

    expect(storyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_SCENE_SUCCESS', () => {
    const initialStateWithStory = {
      items: [{ id: '1', title: 'Story 1', chapters: [{ id: '1', title: 'Chapter 1', scenes: [{ id: '1', title: 'Scene to be deleted' }] }] }],
      loading: false,
      error: null,
    };

    const action = {
      type: types.DELETE_SCENE_SUCCESS,
      payload: { storyId: '1', chapterId: '1', sceneId: '1' },
    };

    const expectedState = {
      items: [{ id: '1', title: 'Story 1', chapters: [{ id: '1', title: 'Chapter 1', scenes: [] }] }],
      loading: false,
      error: null,
    };

    expect(storyReducer(initialStateWithStory, action)).toEqual(expectedState);
  });

  it('should handle DELETE_SCENE_FAILURE', () => {
    const action = {
      type: types.DELETE_SCENE_FAILURE,
      payload: { message: 'Failed to delete scene' },
    };

    const expectedState = {
      items: [],
      loading: false,
      error: { message: 'Failed to delete scene' },
    };

    expect(storyReducer(initialState, action)).toEqual(expectedState);
  });
});
