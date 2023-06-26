import { beforeEach, describe, expect, it } from 'vitest';
import createPipelineControl from '.';

describe('PipelineControl', () => {
  let pipeline: ReturnType<typeof createPipelineControl>;

  beforeEach(() => {
    pipeline = createPipelineControl();
  });

  it('should add an item to the pipeline', () => {
    pipeline.addItem('Data 1');
    expect(pipeline.getPipeline()).toEqual(['Data 1']);
    expect(pipeline.getLength()).toBe(1);
  });

  it('should remove the first item from the pipeline', () => {
    pipeline.addItem('Data 1');
    pipeline.addItem(2);
    pipeline.addItem('Data 3');
    pipeline.removeFirstItem();
    expect(pipeline.getPipeline()).toEqual([2, 'Data 3']);
    expect(pipeline.getLength()).toBe(2);
  });

  it('should return the correct pipeline', () => {
    pipeline.addItem('Data 1');
    pipeline.addItem(2);
    pipeline.addItem('Data 3');
    expect(pipeline.getPipeline()).toEqual(['Data 1', 2, 'Data 3']);
  });

  it('should return the correct length of the pipeline', () => {
    expect(pipeline.getLength()).toBe(0);
    pipeline.addItem('Data 1');
    expect(pipeline.getLength()).toBe(1);
    pipeline.addItem(2);
    expect(pipeline.getLength()).toBe(2);
  });
});
