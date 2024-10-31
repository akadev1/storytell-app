import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Register from '../components/Register';
import rootReducer from '../store/reducers';

const renderWithProviders = (ui, { store = createStore(rootReducer), ...renderOptions } = {}) => {
  const history = createMemoryHistory();
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

describe('Register Component', () => {
  test('renders Register component', () => {
    renderWithProviders(<Register />);
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test('allows user to input username, email, and password', () => {
    renderWithProviders(<Register />);
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    expect(screen.getByLabelText(/Username/i).value).toBe('testuser');
    expect(screen.getByLabelText(/Email/i).value).toBe('testuser@example.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('password123');
  });

  test('submits the form and redirects on successful registration', async () => {
    const store = createStore(rootReducer, {
      auth: { isAuthenticated: false, user: null, error: null },
    });
    renderWithProviders(<Register />, { store });

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/Register/i));

    // Mock the dispatch function to simulate successful registration
    const dispatch = jest.fn().mockResolvedValue(true);
    store.dispatch = dispatch;

    expect(dispatch).toHaveBeenCalledWith({
      type: 'AUTH_SUCCESS',
      payload: { token: 'mockToken', user: { username: 'testuser', email: 'testuser@example.com' } },
    });
  });

  test('shows an alert on registration failure', async () => {
    const store = createStore(rootReducer, {
      auth: { isAuthenticated: false, user: null, error: null },
    });
    renderWithProviders(<Register />, { store });

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/Register/i));

    // Mock the dispatch function to simulate registration failure
    const dispatch = jest.fn().mockResolvedValue(false);
    store.dispatch = dispatch;

    expect(dispatch).toHaveBeenCalledWith({
      type: 'AUTH_FAILURE',
      payload: { message: 'Registration failed. Please try again.' },
    });

    expect(window.alert).toHaveBeenCalledWith('Registration failed. Please try again.');
  });
});
