import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import StoryList from '../components/StoryList';

const mockStore = configureStore([]);

describe('StoryList', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      stories: {
        items: [
          { _id: '1', title: 'Story 1' },
          { _id: '2', title: 'Story 2' },
        ],
        loading: false,
        error: null,
      },
    });
  });

  test('renders stories', () => {
    render(
      <Provider store={store}>
        <StoryList />
      </Provider>
    );

    expect(screen.getByText('Story 1')).toBeInTheDocument();
    expect(screen.getByText('Story 2')).toBeInTheDocument();
  });

  test('renders loading state', () => {
    store = mockStore({
      stories: {
        items: [],
        loading: true,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <StoryList />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    store = mockStore({
      stories: {
        items: [],
        loading: false,
        error: 'Failed to fetch stories',
      },
    });

    render(
      <Provider store={store}>
        <StoryList />
      </Provider>
    );

    expect(screen.getByText('Error: Failed to fetch stories')).toBeInTheDocument();
  });
});
