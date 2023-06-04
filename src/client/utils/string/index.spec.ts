import { describe, expect, test } from 'vitest';
import { getIntByString } from '.';

describe('getIntByString', () => {
  test('Should return the integer number contained in the string', () => {
    const result = getIntByString('A123B456C');
    expect(result).toBe(123456);
  });

  test('Should return null if the string does not contain any numbers', () => {
    const result = getIntByString('XYZ');
    expect(result).toBeNull();
  });

  test('Should return null if the string is empty', () => {
    const result = getIntByString('');
    expect(result).toBeNull();
  });

  test('Should return null if the string contains only special characters', () => {
    const result = getIntByString('!@#$%');
    expect(result).toBeNull();
  });

  test('Should return null if the string contains numbers followed by special characters', () => {
    const result = getIntByString('123!@#$%456');
    expect(result).toBe(123456);
  });
});
