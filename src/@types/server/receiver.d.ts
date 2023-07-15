interface IReceiver {
  establishConnection: () => Promise<string>;
  printData: () => void;
}
