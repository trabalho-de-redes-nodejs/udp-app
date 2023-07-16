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
      const nextAckOfAPackage = parseInt(packageAck) + buffer[packageAck].length;
      return `${nextAckOfAPackage}`;
    };

    if (!Object.keys(buffer).length) return null;

    const keys = Object.keys(buffer);

    const missedAcks = keys
      .map((key, index) => {
        if (index === keys.length - 1) return null;

        const nextAckOfAPackage = getNextAckOfAPackage(key);

        if (!buffer[nextAckOfAPackage]) return parseInt(key);

        return null;
      })
      .filter((ack: number | null) => ack !== null);

    return missedAcks.length ? missedAcks[0] : null;
  };

  const orderBuffer = (): void => {
    const entries = Object.entries(buffer);

    entries.sort((a, b) => {
      const aAck = parseInt(a[0]);
      const bAck = parseInt(b[0]);

      return aAck - bAck;
    });

    clearBuffer();

    entries.forEach((key) => {
      buffer[key[0]] = key[1];
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
