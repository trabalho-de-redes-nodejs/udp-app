const createPipelineControl = (data: string): PipelineControl => {
  const Pipeline = data;

  const getPipeline = (): string => {
    return Pipeline;
  };

  const getLength = (): number => {
    return Pipeline.length;
  };

  const getDataByStartByteAndEndByte = (startByte: number, endByte: number): string => {
    return Pipeline.slice(startByte, endByte);
  };

  return {
    getPipeline,
    getLength,
    getDataByStartByteAndEndByte,
  };
};

export default createPipelineControl;
