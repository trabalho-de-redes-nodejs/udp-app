import { describe, expect, test } from 'vitest';
import buildRequestObject from '.';

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
