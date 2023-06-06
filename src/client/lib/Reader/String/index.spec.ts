import { describe, expect, it } from 'vitest';
import { validateString } from '.';

describe('validateString', () => {
  it('should return the parsed string for a valid input', () => {
    const validInput = 'Hello, world!';
    expect(() => {
      const result = validateString(validInput);
      expect(result).toBe(validInput);
    }).not.toThrow();
  });

  it('should throw an error for an empty input', () => {
    const emptyInput = '';
    expect(() => {
      validateString(emptyInput);
    }).toThrowError('Invalid input. Please enter a non-empty string.');
  });
});
