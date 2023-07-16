interface IReceiver {
  establishConnection: () => Promise<string>;
  createSinalAckAndAddBuffer: (data: IRequest) => Promise<string>;
  printData: () => void;
  getBuffer: () => Promise<BufferControl>;
}
