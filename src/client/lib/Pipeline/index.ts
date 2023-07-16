const createPipelineControl = (data: string, _fileName: string): PipelineControl => {
  const Pipeline = data;
  const fileName = _fileName;

  const getFileName = (): string => {
    return fileName;
  };

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
    getFileName,
    getPipeline,
    getLength,
    getDataByStartByteAndEndByte,
  };
};

export default createPipelineControl;
