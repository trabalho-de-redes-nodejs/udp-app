const createBufferControl = (_size: number): BufferControl => {
  let buffer = '';
  const size = _size;

  const addBuffer = (data: string): void => {
    buffer += data;
  };

  const getBuffer = (): string => {
    return buffer;
  };

  const clearBuffer = (): void => {
    buffer = '';
  };

  const getLength = (): number => {
    return buffer.length;
  };

  const getSize = (): number => {
    return size;
  };

  return {
    addBuffer,
    getBuffer,
    getSize,
    clearBuffer,
    getLength,
  };
};

export default createBufferControl;
