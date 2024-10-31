import { validateEmail, validatePassword, validateUsername } from '../utils/validation';

describe('Validation utility functions', () => {
  describe('validateEmail', () => {
    it('should return true for a valid email', () => {
      const email = 'test@example.com';
      expect(validateEmail(email)).toBe(true);
    });

    it('should return false for an invalid email', () => {
      const email = 'invalid-email';
      expect(validateEmail(email)).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return true for a valid password', () => {
      const password = 'Password1';
      expect(validatePassword(password)).toBe(true);
    });

    it('should return false for an invalid password', () => {
      const password = 'password';
      expect(validatePassword(password)).toBe(false);
    });
  });

  describe('validateUsername', () => {
    it('should return true for a valid username', () => {
      const username = 'valid_username';
      expect(validateUsername(username)).toBe(true);
    });

    it('should return false for an invalid username', () => {
      const username = 'invalid username';
      expect(validateUsername(username)).toBe(false);
    });
  });
});
