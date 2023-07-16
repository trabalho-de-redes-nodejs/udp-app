interface BufferControl {
  addBuffer: (data: string, ack: number) => void;
  getBuffer: () => string[];
  getBufferAsString: () => string;
  getLength: () => number;
  getSize: () => number;
  clearBuffer: () => void;
  getMissedAck: () => number | null;
}
