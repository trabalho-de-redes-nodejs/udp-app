import { describe, expect, it } from 'vitest';
import { validateInteger } from '.';

describe('validateInteger', () => {
  it('should return the input as a number for a valid input', () => {
    const validInput = 10;
    expect(() => {
      const validResult = validateInteger(validInput);
      expect(validResult).toBe(validInput);
    }).not.toThrow();
  });

  it('should throw an error for an input smaller than the min', () => {
    const min = 5;
    const smallerThanMinInput = 3;
    expect(() => {
      validateInteger(smallerThanMinInput, { min });
    }).toThrowError(`Invalid input. Please enter an integer greater than or equal to ${min}.`);
  });

  it('should throw an error for an input greater than the max', () => {
    const max = 20;
    const greaterThanMaxInput = 25;
    expect(() => {
      validateInteger(greaterThanMaxInput, { max });
    }).toThrowError(`Invalid input. Please enter an integer less than or equal to ${max}.`);
  });

  it('should throw an error for an invalid input', () => {
    const invalidInput = 'abc';
    expect(() => {
      validateInteger(invalidInput);
    }).toThrowError('Invalid input. Please enter an integer.');
  });
});
