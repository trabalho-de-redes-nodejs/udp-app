import Reports from 'shared/lib/Report';

const createBufferControl = (_size: number): BufferControl => {
  const buffer: {
    [key: string]: string;
  } = {};
  const size = _size;

  const addBuffer = (data: string, ack: number): void => {
    if (buffer[`${ack}`]) return Reports.addReport('Already received this package');
    if (getLength() > size) return Reports.addReport(`Buffer is overflown: ${buffer.length} > ${size}`);
    orderBuffer();

    buffer[`${ack}`] = data;
  };

  const getBuffer = (): string[] => {
    return Object.values(buffer);
  };

  const getBufferAsString = (): string => {
    return Object.values(buffer).join('');
  };

  const clearBuffer = (): void => {
    Object.keys(buffer).forEach((key) => delete buffer[key]);
  };

  const getLength = (): number => {
    return Object.values(buffer).reduce((acc, curr) => acc + curr.length, 0);
  };

  const getSize = (): number => {
    return size;
  };

  const getMissedAck = (): number | null => {
    const getNextAckOfAPackage = (packageAck: string): string => {
      if (!buffer[packageAck]) return `${packageAck}`;

      const nextAckOfAPackage = parseInt(packageAck) + buffer[packageAck].length;
      return `${nextAckOfAPackage}`;
    };

    if (!Object.keys(buffer).length) return null;

    const entries = Object.entries(buffer);

    const missedAcks = entries
      .map((entry) => {
        const [ack] = entry;

        const nextAckOfAPackage = getNextAckOfAPackage(ack);

        if (!buffer[nextAckOfAPackage]) return parseInt(ack);

        return null;
      })
      .filter((ack: number | null) => ack !== null);

    return missedAcks.length ? missedAcks[0] : null;
  };

  const orderBuffer = (): void => {
    const orderedBuffer: {
      [key: string]: string;
    } = {};

    const entries = Object.entries(buffer);

    entries.forEach((entry) => {
      const [ack, data] = entry;

      const nextAckOfAPackage = parseInt(ack) + data.length;

      orderedBuffer[`${nextAckOfAPackage}`] = data;
    });

    clearBuffer();

    Object.keys(orderedBuffer).forEach((key) => {
      buffer[key] = orderedBuffer[key];
    });
  };

  return {
    addBuffer,
    getBuffer,
    getBufferAsString,
    getSize,
    clearBuffer,
    getLength,
    getMissedAck,
  };
};

export default createBufferControl;
