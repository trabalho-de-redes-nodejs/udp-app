interface BufferControl {
  addBuffer: (data: string) => void;
  getBuffer: () => string;
  getLength: () => number;
  clearBuffer: () => void;
}
