interface BufferControl {
  addBuffer: (data: string) => void;
  getBuffer: () => string;
  getLength: () => number;
  getSize: () => number;
  clearBuffer: () => void;
}
