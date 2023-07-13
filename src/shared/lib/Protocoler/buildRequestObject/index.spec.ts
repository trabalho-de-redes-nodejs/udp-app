import { describe, expect, test } from 'vitest';
import buildRequestObject, { checkAcceptedTypes } from '.';

describe('buildRequestObject', () => {
  test('should return the correct request object', () => {
    const type = 'file';
    const seq = 3;
    const ack = 1;
    const data = 'Hello, World!';

    const request = buildRequestObject(type, seq, ack, data);

    expect(request).toEqual({
      header: {
        seq,
        ack,
      },
      body: {
        data,
        type,
      },
    });
  });

  test('should throw an error for invalid request type', () => {
    const type = 'invalid';
    const seq = 3;
    const ack = 1;
    const data = 'Hello, World!';

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      buildRequestObject(type, seq, ack, data);
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
