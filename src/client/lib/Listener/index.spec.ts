import { beforeEach, describe, it, vi } from 'vitest';
import { Listener } from './';

describe('Listener', () => {
  beforeEach(() => {
    // Mock readlineSync.question for testing purposes
    vi.spyOn(console, 'log').mockImplementation();
    vi.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    // Restore readlineSync.question mock
    vi.restoreAllMocks();
  });

  describe('int', () => {
    it('should return the integer input', () => {
      vi.spyOn(console, 'question').mockReturnValueOnce('42');

      const result = Listener.int('Enter an integer:');

      expect(result).toBe(42);
    });

    it('should display error for invalid input', () => {
      vi.spyOn(console, 'question').mockReturnValueOnce('invalid');

      Listener.int('Enter an integer:');

      expect(console.error).toHaveBeenCalledWith('Invalid input. Please enter an integer.');
    });

    it('should display error for input less than min', () => {
      vi.spyOn(console, 'question').mockReturnValueOnce('5');

      Listener.int('Enter an integer:', { min: 10 });

      expect(console.error).toHaveBeenCalledWith('Invalid input. Please enter an integer greater than or equal to 10.');
    });

    it('should display error for input greater than max', () => {
      vi.spyOn(console, 'question').mockReturnValueOnce('100');

      Listener.int('Enter an integer:', { max: 50 });

      expect(console.error).toHaveBeenCalledWith('Invalid input. Please enter an integer less than or equal to 50.');
    });
  });

  describe('string', () => {
    it('should return the string input', () => {
      vi.spyOn(console, 'question').mockReturnValueOnce('Hello');

      const result = Listener.string('Enter a string:');

      expect(result).toBe('Hello');
    });
  });
});
