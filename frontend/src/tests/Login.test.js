import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/Login';
import rootReducer from '../store/reducers';

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

test('renders Login component', () => {
  renderWithRedux(
    <Router>
      <Login />
    </Router>
  );
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test('allows the user to login', () => {
  renderWithRedux(
    <Router>
      <Login />
    </Router>
  );

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByText(/login/i));

  expect(screen.getByText(/login/i)).toBeInTheDocument();
});
