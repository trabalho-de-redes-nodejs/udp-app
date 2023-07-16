interface IReceiver {
  establishConnection: () => Promise<string>;
  receiveData: (data: IRequest) => Promise<string>;
  finishConnection: (data: IRequest) => Promise<string>;
  printData: () => void;
  getBuffer: () => Promise<BufferControl>;
}
