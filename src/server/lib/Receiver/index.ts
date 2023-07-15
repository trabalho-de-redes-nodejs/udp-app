import { Socket } from 'dgram';
import fs from 'fs';
import createBufferControl from '../Buffer';
import Protocoler from 'shared/lib/Protocoler';
import Requester from 'client/lib/Requester';
import FileSplitter from 'shared/lib/FileSplitter';

const Receiver = (clientSeq: number, clientAck: number, clientWindowSize: number, clientMSS: number): IReceiver => {
  const buffer: BufferControl = createBufferControl();
  const ack = clientSeq + 1;
  const seq = clientAck;
  const maximumSegmentSize = clientMSS;
  const windowSize = clientWindowSize;

  const establishConnection = async (): Promise<string> => {
    const connectionResponse: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'SYN');

    const connectionResponseToString = JSON.stringify(connectionResponse);

    return connectionResponseToString;
  };

  const printData = (): void => {
    console.log('Receiver');
    console.log('seq: ', seq);
    console.log('ack: ', ack);
    console.log('windowSize: ', windowSize);
    console.log('maximumSegmentSize: ', maximumSegmentSize);
  };

  const getTcpHeader = (): ITcpHeader => {
    return {
      ack,
      seq,
      windowSize,
      maximumSegmentSize,
    };
  };

  return { establishConnection, printData };
};

export default Receiver;
