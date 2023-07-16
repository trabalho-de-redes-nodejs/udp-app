import dgram from 'dgram';
import Receiver from './lib/Receiver';
import { serverAddress, serverPort } from 'config/config';
import Protocoler from 'shared/lib/Protocoler';

const socket = dgram.createSocket('udp4');

let receiver: IReceiver = Receiver(0, 0);

socket.bind(serverPort, serverAddress, () => {
  console.log(`Server listening on ${serverAddress}:${serverPort}`);
});

const establishConnection = async (data: IRequest, remoteInfo: dgram.RemoteInfo): Promise<void> => {
  receiver = Receiver(data.header.ack, data.header.maximumSegmentSize);

  console.log('Connection established with client:', remoteInfo.address, remoteInfo.port);

  const responseMessage = await receiver.establishConnection();
  socket.send(responseMessage, remoteInfo.port, remoteInfo.address);
};

const responseAckAndAddToBuffer = async (data: IRequest, remoteInfo: dgram.RemoteInfo): Promise<void> => {
  console.log('Received data from client:', remoteInfo.address, remoteInfo.port);

  const responseMessage: string = await receiver.receiveData(data);
  socket.send(responseMessage, remoteInfo.port, remoteInfo.address);
};

const finishConnection = async (data: IRequest, remoteInfo: dgram.RemoteInfo): Promise<void> => {
  const response = await receiver.finishConnection(data);
  socket.send(response, remoteInfo.port, remoteInfo.address);

  console.log('Connection finished with client:', remoteInfo.address, remoteInfo.port);
};

socket.on('message', (message: string, remoteInfo: dgram.RemoteInfo) => {
  try {
    const data: IRequest = Protocoler.getRequestObject(message);

    if (!data) {
      throw data;
    }

    if (data.header.syn) {
      establishConnection(data, remoteInfo);
      return;
    }

    if (data.header.fyn) {
      finishConnection(data, remoteInfo);
      return;
    }

    responseAckAndAddToBuffer(data, remoteInfo);
  } catch (err) {
    const errorResponse = (err as Error)?.message || err;
    console.error(errorResponse);

    const bytesToSend = Buffer.from(errorResponse as string);
    socket.send(bytesToSend, remoteInfo.port, remoteInfo.address);
  }
});
