const createPipelineControl = (): PipelineControl => {
  const Pipeline: string[] = [];

  const addItem = (data: string): void => {
    Pipeline.push(data);
  };

  const getFirstItem = (): string => {
    return Pipeline[0];
  };

  const getPipeline = (): string[] => {
    return Pipeline;
  };

  const shift = (): void => {
    Pipeline.shift();
  };

  const getLength = (): number => {
    return Pipeline.length;
  };

  return {
    addItem,
    getPipeline,
    shift,
    getLength,
    getFirstItem,
  };
};

export default createPipelineControl;
