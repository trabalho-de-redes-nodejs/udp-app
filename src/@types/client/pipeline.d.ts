interface PipelineControl {
  getPipeline: () => string;
  getLength: () => number;
  getDataByStartByteAndEndByte: (startByte: number, endByte: number) => string;
}
