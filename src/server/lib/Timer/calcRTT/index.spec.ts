import { describe, expect, it } from 'vitest';
import { calcRTT } from '.';

describe('calcRTT', () => {
  it('calculates the RTT correctly', () => {
    const estimatedRTT = 100;
    const devRTT = 20;
    const expectedRTT = 100 + 4 * 20;
    const result = calcRTT(estimatedRTT, devRTT);
    expect(result).toBe(expectedRTT);
  });

  it('calculates the RTT correctly when estimatedRTT is zero', () => {
    const estimatedRTT = 0;
    const devRTT = 30;
    const expectedRTT = 0 + 4 * 30;
    const result = calcRTT(estimatedRTT, devRTT);
    expect(result).toBe(expectedRTT);
  });

  it('calculates the RTT correctly when devRTT is zero', () => {
    const estimatedRTT = 200;
    const devRTT = 0;
    const expectedRTT = 200 + 4 * 0;
    const result = calcRTT(estimatedRTT, devRTT);
    expect(result).toBe(expectedRTT);
  });
});
