interface PipelineControl {
  getPipeline: () => string;
  getFileName: () => string;
  getLength: () => number;
  getDataByStartByteAndEndByte: (startByte: number, endByte: number) => string;
}
