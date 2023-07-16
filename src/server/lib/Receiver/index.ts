import createBufferControl from '../Buffer';
import { buildFile, checkIfFileExists, addContentToFile } from 'server/services/file';
import Protocoler from 'shared/lib/Protocoler';

const Receiver = (clientAck: number, clientMSS: number): IReceiver => {
  const buffer: BufferControl = createBufferControl(clientMSS * 10);
  let ack = 0;
  let seq = clientAck;
  const maximumSegmentSize = clientMSS;
  let rwnd = buffer.getSize();

  const establishConnection = async (): Promise<string> => {
    const connectionResponse: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'SYN');

    const connectionResponseToString = JSON.stringify(connectionResponse);

    return connectionResponseToString;
  };

  const receiveData = async (data: IRequest): Promise<string> => {
    buffer.addBuffer(data.body.data, data.header.ack);

    seq = ack;
    ack = ack + data.body.data.length;
    rwnd -= data.body.data.length;

    console.log(`ack: ${data.header.ack}, seq: ${data.header.seq}, rwnd: ${rwnd}`);

    if (rwnd <= clientMSS) {
      await unpackBuffer(data.body?.fileName);
    }

    const connectionResponse: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'ACK');
    return JSON.stringify(connectionResponse);
  };

  const finishConnection = async (data: IRequest): Promise<string> => {
    unpackBuffer(data.body?.fileName);
    const connectionResponse: IRequest = Protocoler.buildRequestObject(getTcpHeader(), '', 'FYN');

    return JSON.stringify(connectionResponse);
  };

  const unpackBuffer = async (fileName = 'file.txt'): Promise<void> => {
    console.log('Unpacking buffer...', fileName);

    const fileExists = checkIfFileExists(fileName);

    !fileExists ? await buildFile(buffer, fileName) : await addContentToFile(fileName, buffer.getBufferAsString());

    buffer.clearBuffer();
    rwnd = buffer.getSize();
  };

  const getBuffer = async (): Promise<BufferControl> => {
    return buffer;
  };

  const getTcpHeader = (): ITcpHeader => {
    return {
      ack,
      seq,
      windowSize: rwnd,
      maximumSegmentSize,
    };
  };

  return { establishConnection, receiveData, getBuffer, finishConnection };
};

export default Receiver;
