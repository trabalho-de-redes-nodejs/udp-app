import createBufferControl from '../Buffer';
import Protocoler from 'shared/lib/Protocoler';

const Receiver = (clientSeq: number, clientAck: number, clientWindowSize: number, clientMSS: number): IReceiver => {
  const buffer: BufferControl = createBufferControl();
  let ack = clientSeq + 1;
  let seq = clientAck;
  const maximumSegmentSize = clientMSS;
  const windowSize = clientWindowSize;

  const establishConnection = async (): Promise<string> => {
    const connectionResponse: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'SYN');

    const connectionResponseToString = JSON.stringify(connectionResponse);

    return connectionResponseToString;
  };

  const createSinalAckAndAddBuffer = async (data: string): Promise<string> => {
    ack = clientSeq + clientMSS;
    seq = ack - clientMSS;

    buffer.addBuffer(data);

    const connectionResponse: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'ACK');
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

  const getBuffer = async (): Promise<BufferControl> => {
    return buffer;
  };

  const getTcpHeader = (): ITcpHeader => {
    return {
      ack,
      seq,
      windowSize,
      maximumSegmentSize,
    };
  };

  return { establishConnection, printData, createSinalAckAndAddBuffer, getBuffer };
};

export default Receiver;
