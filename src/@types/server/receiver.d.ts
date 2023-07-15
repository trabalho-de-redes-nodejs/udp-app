interface IReceiver {
  establishConnection: () => Promise<string>;
  createSinalAckAndAddBuffer: (data: string) => Promise<string>;
  printData: () => void;
  getBuffer: () => Promise<BufferControl>;
}
