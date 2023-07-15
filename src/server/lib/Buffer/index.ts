const createBufferControl = (): BufferControl => {
  let buffer = '';

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

  return {
    addBuffer,
    getBuffer,
    clearBuffer,
    getLength,
  };
};

export default createBufferControl;
