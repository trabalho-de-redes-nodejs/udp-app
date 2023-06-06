import { test, describe, assert } from 'vitest';
import { isPromise } from '.';

describe('isPromise', () => {
  test('should correctly identify promise function', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const promiseFunc = async () => {};

    assert(isPromise(promiseFunc), 'Promise function should be identified as a promise');
  });

  test('should correctly identify non-promise function', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const nonPromiseFunc = () => {};

    assert(!isPromise(nonPromiseFunc), 'Non-promise function should not be identified as a promise');
  });

  test('should not execute the function', () => {
    let isCalled = false;
    const myFunc = () => {
      isCalled = true;
    };

    isPromise(myFunc);

    assert(!isCalled, 'The function should not be called');
  });
});
