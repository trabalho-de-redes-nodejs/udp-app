import { beforeEach, describe, expect, it } from 'vitest';
import createBufferControl from '.';

describe('BufferControl', () => {
  let bufferControl: ReturnType<typeof createBufferControl>;

  beforeEach(() => {
    bufferControl = createBufferControl();
  });

  it('should add an item to the buffer', () => {
    bufferControl.addBuffer('Data 1');
    expect(bufferControl.getBuffer()).toEqual(['Data 1']);
    expect(bufferControl.getLength()).toBe(1);
  });

  it('should clear the buffer', () => {
    bufferControl.addBuffer('Data 1');
    bufferControl.addBuffer(2);
    bufferControl.addBuffer('Data 3');
    bufferControl.clearBuffer();
    expect(bufferControl.getBuffer()).toEqual([]);
    expect(bufferControl.getLength()).toBe(0);
  });

  it('should return the correct buffer', () => {
    bufferControl.addBuffer('Data 1');
    bufferControl.addBuffer(2);
    bufferControl.addBuffer('Data 3');
    expect(bufferControl.getBuffer()).toEqual(['Data 1', 2, 'Data 3']);
  });

  it('should return the correct length of the buffer', () => {
    expect(bufferControl.getLength()).toBe(0);
    bufferControl.addBuffer('Data 1');
    expect(bufferControl.getLength()).toBe(1);
    bufferControl.addBuffer(2);
    expect(bufferControl.getLength()).toBe(2);
  });
});
