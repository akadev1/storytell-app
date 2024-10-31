import { registerUser, loginUser, logoutUser, getToken, setToken, removeToken } from '../utils/auth';

describe('auth utility functions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('registerUser', () => {
    it('should register a user successfully', async () => {
      const userData = { username: 'testuser', email: 'test@example.com', password: 'password' };
      const response = { token: 'token', user: { id: '1', email: 'test@example.com' } };

      jest.spyOn(api, 'post').mockResolvedValueOnce({ data: response });

      const result = await registerUser(userData);
      expect(result).toEqual(response);
    });

    it('should throw an error if registration fails', async () => {
      const userData = { username: 'testuser', email: 'test@example.com', password: 'password' };
      const errorResponse = { message: 'Registration failed' };

      jest.spyOn(api, 'post').mockRejectedValueOnce({ response: { data: errorResponse } });

      await expect(registerUser(userData)).rejects.toEqual(errorResponse);
    });
  });

  describe('loginUser', () => {
    it('should log in a user successfully', async () => {
      const userData = { email: 'test@example.com', password: 'password' };
      const response = { token: 'token', user: { id: '1', email: 'test@example.com' } };

      jest.spyOn(api, 'post').mockResolvedValueOnce({ data: response });

      const result = await loginUser(userData);
      expect(result).toEqual(response);
    });

    it('should throw an error if login fails', async () => {
      const userData = { email: 'test@example.com', password: 'password' };
      const errorResponse = { message: 'Invalid credentials' };

      jest.spyOn(api, 'post').mockRejectedValueOnce({ response: { data: errorResponse } });

      await expect(loginUser(userData)).rejects.toEqual(errorResponse);
    });
  });

  describe('logoutUser', () => {
    it('should remove the token from localStorage', () => {
      localStorage.setItem('token', 'token');
      logoutUser();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('getToken', () => {
    it('should return the token from localStorage', () => {
      localStorage.setItem('token', 'token');
      const token = getToken();
      expect(token).toBe('token');
    });

    it('should return null if no token is found', () => {
      const token = getToken();
      expect(token).toBeNull();
    });
  });

  describe('setToken', () => {
    it('should set the token in localStorage', () => {
      setToken('token');
      expect(localStorage.getItem('token')).toBe('token');
    });
  });

  describe('removeToken', () => {
    it('should remove the token from localStorage', () => {
      localStorage.setItem('token', 'token');
      removeToken();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });
});
