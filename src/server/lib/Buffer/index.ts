interface BufferControl {
  addBuffer: (data: string | number) => void;
  getBuffer: () => (string | number)[];
  getLength: () => number;
  clearBuffer: () => void;
}

const createBufferControl = (): BufferControl => {
  const buffer: (string | number)[] = [];

  const addBuffer = (data: string | number): void => {
    buffer.push(data);
  };

  const getBuffer = (): (string | number)[] => {
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
