import { describe, expect, it, vi } from 'vitest';
import { timeoutControl } from '.';

describe('timeoutControl', () => {
  it('calls the callback after the specified time', () => {
    const key = 'test';
    const time = 1000;
    const callback = vi.fn();

    timeoutControl(key, time, callback);

    setTimeout(() => {
      expect(callback).toHaveBeenCalledTimes(1);
    }, time + 100);
  });
});
