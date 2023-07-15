interface BufferControl {
  addBuffer: (data: string) => void;
  getBuffer: () => string[];
  getLength: () => number;
  clearBuffer: () => void;
}

const createBufferControl = (windowSize: number): BufferControl => {
  const buffer: string[] = new Array(windowSize);

  const addBuffer = (data: string): void => {
    buffer.push(data);
  };

  const getBuffer = (): string[] => {
    return buffer;
  };

  const clearBuffer = (): void => {
    buffer.length = 0;
  };

  const getLength = (): number => {
    return buffer.length;
  };

  return {
    addBuffer,
    getBuffer,
    clearBuffer,
    getLength,
  };
};

export default createBufferControl;
