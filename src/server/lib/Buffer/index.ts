import Reports from 'shared/lib/Report';

const createBufferControl = (_size: number): BufferControl => {
  const buffer: string[] = [];
  const size = _size;

  const addBuffer = (data: string, ack: number): void => {
    if (buffer[`${ack}`]) return Reports.addReport('Already received this package');
    if (getLength() > size) return Reports.addReport(`Buffer is overflown: ${buffer.length} > ${size}`);
    orderBuffer();

    buffer[`${ack}`] = data;
  };

  const getBuffer = (): string[] => {
    return buffer;
  };

  const getBufferAsString = (): string => {
    return buffer.join('');
  };

  const clearBuffer = (): void => {
    buffer.length = 0;
  };

  const getLength = (): number => {
    return buffer.join('').length;
  };

  const getSize = (): number => {
    return size;
  };

  const orderBuffer = (): void => {
    buffer.sort((a, b) => {
      const aAck = parseInt(a.split(':')[0]);
      const bAck = parseInt(b.split(':')[0]);

      if (aAck < bAck) return -1;
      if (aAck > bAck) return 1;
      return 0;
    });
  };

  return {
    addBuffer,
    getBuffer,
    getBufferAsString,
    getSize,
    clearBuffer,
    getLength,
  };
};

export default createBufferControl;
