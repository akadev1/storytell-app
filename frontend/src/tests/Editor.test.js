import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Editor from '../components/Editor';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Editor Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      stories: [],
      chapters: [],
      scenes: [],
    });
  });

  test('renders Story Editor header', () => {
    render(
      <Provider store={store}>
        <Editor />
      </Provider>
    );
    expect(screen.getByText('Story Editor')).toBeInTheDocument();
  });

  test('renders Create Story button', () => {
    render(
      <Provider store={store}>
        <Editor />
      </Provider>
    );
    expect(screen.getByText('Create Story')).toBeInTheDocument();
  });

  test('creates a new story', () => {
    render(
      <Provider store={store}>
        <Editor />
      </Provider>
    );

    fireEvent.click(screen.getByText('Create Story'));
    const title = 'New Story';
    window.prompt = jest.fn().mockReturnValue(title);

    expect(store.getActions()).toContainEqual({
      type: 'CREATE_STORY_SUCCESS',
      payload: { title },
    });
  });

  test('updates a story', () => {
    const story = { id: 1, title: 'Old Story' };
    store = mockStore({
      stories: [story],
      chapters: [],
      scenes: [],
    });

    render(
      <Provider store={store}>
        <Editor />
      </Provider>
    );

    fireEvent.click(screen.getByText('Update'));
    const newTitle = 'Updated Story';
    window.prompt = jest.fn().mockReturnValue(newTitle);

    expect(store.getActions()).toContainEqual({
      type: 'UPDATE_STORY_SUCCESS',
      payload: { ...story, title: newTitle },
    });
  });

  test('deletes a story', () => {
    const story = { id: 1, title: 'Story to Delete' };
    store = mockStore({
      stories: [story],
      chapters: [],
      scenes: [],
    });

    render(
      <Provider store={store}>
        <Editor />
      </Provider>
    );

    fireEvent.click(screen.getByText('Delete'));
    window.confirm = jest.fn().mockReturnValue(true);

    expect(store.getActions()).toContainEqual({
      type: 'DELETE_STORY_SUCCESS',
      payload: story.id,
    });
  });
});
