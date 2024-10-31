import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import StoryViewer from '../components/StoryViewer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('StoryViewer', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      stories: {
        currentStory: {
          title: 'Test Story',
          author: 'Test Author',
          chapters: [
            {
              _id: '1',
              title: 'Chapter 1',
              scenes: [
                {
                  _id: '1-1',
                  title: 'Scene 1',
                  content: 'Scene 1 content',
                },
              ],
            },
          ],
        },
        loading: false,
        error: null,
      },
    });
  });

  test('renders story title and author', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/stories/1']}>
          <Route path="/stories/:id">
            <StoryViewer />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Test Story')).toBeInTheDocument();
    expect(screen.getByText('By Test Author')).toBeInTheDocument();
  });

  test('renders chapters and scenes', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/stories/1']}>
          <Route path="/stories/:id">
            <StoryViewer />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
    expect(screen.getByText('Scene 1')).toBeInTheDocument();
    expect(screen.getByText('Scene 1 content')).toBeInTheDocument();
  });

  test('renders loading state', () => {
    store = mockStore({
      stories: {
        currentStory: null,
        loading: true,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/stories/1']}>
          <Route path="/stories/:id">
            <StoryViewer />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    store = mockStore({
      stories: {
        currentStory: null,
        loading: false,
        error: 'Error fetching story',
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/stories/1']}>
          <Route path="/stories/:id">
            <StoryViewer />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Error: Error fetching story')).toBeInTheDocument();
  });

  test('renders story not found state', () => {
    store = mockStore({
      stories: {
        currentStory: null,
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/stories/1']}>
          <Route path="/stories/:id">
            <StoryViewer />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Story not found')).toBeInTheDocument();
  });
});
