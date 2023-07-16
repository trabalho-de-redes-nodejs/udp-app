import createBufferControl from '../Buffer';
import { buildFile } from 'server/services/file';
import Protocoler from 'shared/lib/Protocoler';

const Receiver = (clientAck: number, clientWindowSize: number, clientMSS: number): IReceiver => {
  const buffer: BufferControl = createBufferControl();
  let ack = 0;
  let seq = clientAck;
  const maximumSegmentSize = clientMSS;
  const windowSize = clientWindowSize;

  const establishConnection = async (): Promise<string> => {
    const connectionResponse: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'SYN');

    const connectionResponseToString = JSON.stringify(connectionResponse);

    return connectionResponseToString;
  };

  const receiveData = async (data: IRequest): Promise<string> => {
    buffer.addBuffer(data.body.data);

    seq = ack;
    ack = buffer.getLength();

    const connectionResponse: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'ACK');
    return JSON.stringify(connectionResponse);
  };

  const finishConnection = async (data: IRequest): Promise<string> => {
    buildFile(buffer, data.body?.fileName);
    const connectionResponse: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'FYN');

    return JSON.stringify(connectionResponse);
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

  return { establishConnection, printData, receiveData, getBuffer, finishConnection };
};

export default Receiver;
