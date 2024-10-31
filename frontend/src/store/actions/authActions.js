import axios from 'axios';
import { AUTH_SUCCESS, AUTH_FAILURE, LOGOUT } from './types';

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', { email, password });
    dispatch({ type: AUTH_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_FAILURE, payload: err.response.data });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/register', { username, email, password });
    dispatch({ type: AUTH_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_FAILURE, payload: err.response.data });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
