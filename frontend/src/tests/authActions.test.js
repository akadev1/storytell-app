import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { login, register, logout } from '../store/actions/authActions';
import { AUTH_SUCCESS, AUTH_FAILURE, LOGOUT } from '../store/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('authActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    mock.reset();
  });

  it('creates AUTH_SUCCESS when login is successful', async () => {
    const userData = { email: 'test@example.com', password: 'password' };
    const response = { token: 'token', user: { id: '1', email: 'test@example.com' } };

    mock.onPost('/api/auth/login').reply(200, response);

    const expectedActions = [
      { type: AUTH_SUCCESS, payload: response },
    ];

    await store.dispatch(login(userData.email, userData.password));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates AUTH_FAILURE when login fails', async () => {
    const userData = { email: 'test@example.com', password: 'password' };
    const errorResponse = { message: 'Invalid credentials' };

    mock.onPost('/api/auth/login').reply(400, errorResponse);

    const expectedActions = [
      { type: AUTH_FAILURE, payload: errorResponse },
    ];

    await store.dispatch(login(userData.email, userData.password));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates AUTH_SUCCESS when registration is successful', async () => {
    const userData = { username: 'testuser', email: 'test@example.com', password: 'password' };
    const response = { token: 'token', user: { id: '1', email: 'test@example.com' } };

    mock.onPost('/api/auth/register').reply(200, response);

    const expectedActions = [
      { type: AUTH_SUCCESS, payload: response },
    ];

    await store.dispatch(register(userData.username, userData.email, userData.password));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates AUTH_FAILURE when registration fails', async () => {
    const userData = { username: 'testuser', email: 'test@example.com', password: 'password' };
    const errorResponse = { message: 'Registration failed' };

    mock.onPost('/api/auth/register').reply(400, errorResponse);

    const expectedActions = [
      { type: AUTH_FAILURE, payload: errorResponse },
    ];

    await store.dispatch(register(userData.username, userData.email, userData.password));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates LOGOUT when logout is called', () => {
    const expectedActions = [
      { type: LOGOUT },
    ];

    store.dispatch(logout());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
