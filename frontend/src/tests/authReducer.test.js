import authReducer from '../store/reducers/authReducer';
import { AUTH_SUCCESS, AUTH_FAILURE, LOGOUT } from '../store/actions/types';

describe('authReducer', () => {
  const initialState = {
    token: null,
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle AUTH_SUCCESS', () => {
    const action = {
      type: AUTH_SUCCESS,
      payload: {
        token: 'token',
        user: { id: '1', email: 'test@example.com' },
      },
    };

    const expectedState = {
      token: 'token',
      isAuthenticated: true,
      loading: false,
      user: { id: '1', email: 'test@example.com' },
      error: null,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle AUTH_FAILURE', () => {
    const action = {
      type: AUTH_FAILURE,
      payload: { message: 'Invalid credentials' },
    };

    const expectedState = {
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
      error: { message: 'Invalid credentials' },
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGOUT', () => {
    const action = { type: LOGOUT };

    const expectedState = {
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
      error: null,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });
});
