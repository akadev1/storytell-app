import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import store from '../store';
import GlobalStyles from '../styles/globalStyles';
import theme from '../styles/theme';

test('renders login page when not authenticated', () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  );

  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test('renders story list page when authenticated', () => {
  // Mock the isAuthenticated state to be true
  const mockStore = {
    ...store,
    getState: () => ({
      ...store.getState(),
      auth: { isAuthenticated: true },
    }),
  };

  render(
    <Provider store={mockStore}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  );

  expect(screen.getByText(/stories/i)).toBeInTheDocument();
});
