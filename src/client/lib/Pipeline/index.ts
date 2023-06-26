interface PipelineControl {
  addItem: (data: string | number) => void;
  getPipeline: () => (string | number)[];
  getLength: () => number;
  removeFirstItem: () => void;
}

const createPipelineControl = (): PipelineControl => {
  const Pipeline: (string | number)[] = [];

  const addItem = (data: string | number): void => {
    Pipeline.push(data);
  };

  const getPipeline = (): (string | number)[] => {
    return Pipeline;
  };

  const removeFirstItem = (): void => {
    Pipeline.shift();
  };

  const getLength = (): number => {
    return Pipeline.length;
  };

  return {
    addItem,
    getPipeline,
    removeFirstItem,
    getLength,
  };
};

export default createPipelineControl;
