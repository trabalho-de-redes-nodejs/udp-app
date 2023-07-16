import { describe, expect, it } from 'vitest';
import createPipelineControl from '.';

describe('createPipelineControl', () => {
  const data = 'Hello, World!';
  const pipelineControl = createPipelineControl(data);

  it('getPipeline should return the correct pipeline', () => {
    const pipeline = pipelineControl.getPipeline();
    expect(pipeline).toBe(data);
  });

  it('getLength should return the correct length of the pipeline', () => {
    const length = pipelineControl.getLength();
    expect(length).toBe(data.length);
  });

  it('getDataByStartByteAndEndByte should return the correct data slice', () => {
    const startByte = 7;
    const endByte = 12;
    const expectedSlice = data.slice(startByte, endByte);
    const slice = pipelineControl.getDataByStartByteAndEndByte(startByte, endByte);
    expect(slice).toBe(expectedSlice);
  });

  it('getDataByStartByteAndEndByte should return the correct data slice', () => {
    const startByte = 0;
    const endByte = 5;
    const expectedSlice = 'Hello';
    const slice = pipelineControl.getDataByStartByteAndEndByte(startByte, endByte);
    expect(slice).toBe(expectedSlice);
  });
});
