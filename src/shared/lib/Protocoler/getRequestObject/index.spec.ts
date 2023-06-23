import { describe, expect, test } from 'vitest';
import { verifyRequest } from '.';

describe('verifyRequest', () => {
  test('should return true for a valid request', () => {
    const validRequest = {
      header: {
        type: 'file',
        totalParts: 3,
        partNumber: 1,
      },
      body: 'Sample body',
    };

    const result = verifyRequest(validRequest);
    expect(result).toBe(true);
  });

  test('should return false for an invalid request without body or header', () => {
    const invalidRequest = {};

    const result = verifyRequest(invalidRequest);
    expect(result).toBe(false);
  });

  test('should return false for an invalid request without required fields in header', () => {
    const invalidRequest = {
      header: {},
      body: 'Sample body',
    };

    const result = verifyRequest(invalidRequest);
    expect(result).toBe(false);
  });
});
