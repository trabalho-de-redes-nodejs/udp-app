import { describe, expect, test } from 'vitest';
import buildRequestObject, { checkAcceptedTypes } from '.';

describe('buildRequestObject', () => {
  test('should return the correct request object', () => {
    const type = 'file';
    const totalParts = 3;
    const partNumber = 1;
    const data = 'Hello, World!';

    const request = buildRequestObject(type, totalParts, partNumber, data);

    expect(request).toEqual({
      header: {
        type,
        totalParts,
        partNumber,
      },
      body: data,
    });
  });

  test('should throw an error for invalid request type', () => {
    const type = 'invalid';
    const totalParts = 3;
    const partNumber = 1;
    const data = 'Hello, World!';

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      buildRequestObject(type, totalParts, partNumber, data);
    }).toThrow('Invalid request type');
  });
});

describe('checkAcceptedTypes', () => {
  test('should return true for accepted types', () => {
    const acceptedTypes = ['file', 'message'];

    acceptedTypes.forEach((type) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = checkAcceptedTypes(type);
      expect(result).toBe(true);
    });
  });

  test('should return false for non-accepted types', () => {
    const nonAcceptedTypes = ['image', 'video', 'audio'];

    nonAcceptedTypes.forEach((type) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = checkAcceptedTypes(type);
      expect(result).toBe(false);
    });
  });
});
