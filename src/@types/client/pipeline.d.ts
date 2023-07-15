interface PipelineControl {
  addItem: (data: string) => void;
  getPipeline: () => string[];
  getLength: () => number;
  shift: () => void;
  getFirstItem: () => string;
}
