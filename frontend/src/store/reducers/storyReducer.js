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
} from '../actions/types';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const storyReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_STORIES_SUCCESS:
      return {
        ...state,
        items: payload,
        loading: false,
        error: null,
      };
    case FETCH_STORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CREATE_STORY_SUCCESS:
      return {
        ...state,
        items: [...state.items, payload],
        loading: false,
        error: null,
      };
    case CREATE_STORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_STORY_SUCCESS:
      return {
        ...state,
        items: state.items.map((story) =>
          story._id === payload._id ? payload : story
        ),
        loading: false,
        error: null,
      };
    case UPDATE_STORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case DELETE_STORY_SUCCESS:
      return {
        ...state,
        items: state.items.filter((story) => story._id !== payload),
        loading: false,
        error: null,
      };
    case DELETE_STORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FETCH_CHAPTERS_SUCCESS:
      return {
        ...state,
        items: state.items.map((story) =>
          story._id === payload.storyId
            ? { ...story, chapters: payload.chapters }
            : story
        ),
        loading: false,
        error: null,
      };
    case FETCH_CHAPTERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CREATE_CHAPTER_SUCCESS:
      return {
        ...state,
        items: state.items.map((story) =>
          story._id === payload.storyId
            ? { ...story, chapters: [...story.chapters, payload.chapter] }
            : story
        ),
        loading: false,
        error: null,
      };
    case CREATE_CHAPTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_CHAPTER_SUCCESS:
      return {
        ...state,
        items: state.items.map((story) =>
          story._id === payload.storyId
            ? {
                ...story,
                chapters: story.chapters.map((chapter) =>
                  chapter._id === payload.chapter._id
                    ? payload.chapter
                    : chapter
                ),
              }
            : story
        ),
        loading: false,
        error: null,
      };
    case UPDATE_CHAPTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case DELETE_CHAPTER_SUCCESS:
      return {
        ...state,
        items: state.items.map((story) =>
          story._id === payload.storyId
            ? {
                ...story,
                chapters: story.chapters.filter(
                  (chapter) => chapter._id !== payload.chapterId
                ),
              }
            : story
        ),
        loading: false,
        error: null,
      };
    case DELETE_CHAPTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FETCH_SCENES_SUCCESS:
      return {
        ...state,
        items: state.items.map((story) =>
          story._id === payload.storyId
            ? {
                ...story,
                chapters: story.chapters.map((chapter) =>
                  chapter._id === payload.chapterId
                    ? { ...chapter, scenes: payload.scenes }
                    : chapter
                ),
              }
            : story
        ),
        loading: false,
        error: null,
      };
    case FETCH_SCENES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CREATE_SCENE_SUCCESS:
      return {
        ...state,
        items: state.items.map((story) =>
          story._id === payload.storyId
            ? {
                ...story,
                chapters: story.chapters.map((chapter) =>
                  chapter._id === payload.chapterId
                    ? { ...chapter, scenes: [...chapter.scenes, payload.scene] }
                    : chapter
                ),
              }
            : story
        ),
        loading: false,
        error: null,
      };
    case CREATE_SCENE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_SCENE_SUCCESS:
      return {
        ...state,
        items: state.items.map((story) =>
          story._id === payload.storyId
            ? {
                ...story,
                chapters: story.chapters.map((chapter) =>
                  chapter._id === payload.chapterId
                    ? {
                        ...chapter,
                        scenes: chapter.scenes.map((scene) =>
                          scene._id === payload.scene._id
                            ? payload.scene
                            : scene
                        ),
                      }
                    : chapter
                ),
              }
            : story
        ),
        loading: false,
        error: null,
      };
    case UPDATE_SCENE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case DELETE_SCENE_SUCCESS:
      return {
        ...state,
        items: state.items.map((story) =>
          story._id === payload.storyId
            ? {
                ...story,
                chapters: story.chapters.map((chapter) =>
                  chapter._id === payload.chapterId
                    ? {
                        ...chapter,
                        scenes: chapter.scenes.filter(
                          (scene) => scene._id !== payload.sceneId
                        ),
                      }
                    : chapter
                ),
              }
            : story
        ),
        loading: false,
        error: null,
      };
    case DELETE_SCENE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default storyReducer;
