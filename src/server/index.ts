import dgram from 'dgram';
import message from './services/message';
import file from './services/file';
import { serverAddress, serverPort } from 'config/config';
import Protocoler from 'shared/lib/Protocoler';

const socket = dgram.createSocket('udp4');

const respond = (data: IRequest, remoteInfo: dgram.RemoteInfo): string => {
  const controller = {
    message: () => message(data.body, remoteInfo),
    file: () => file(data, remoteInfo),
  };

  if (controller[data.header.type]) {
    return controller[data.header.type]();
  }

  throw new Error('Invalid request type');
};

socket.bind(serverPort, serverAddress, () => {
  console.log(`Server listening on ${serverAddress}:${serverPort}`);
});

socket.on('message', (message: string, remoteInfo: dgram.RemoteInfo) => {
  try {
    const data: IRequest = Protocoler.getRequestObject(message);
    const responseMessage = respond(data, remoteInfo);

    const bytesToSend = Buffer.from(responseMessage);
    socket.send(bytesToSend, remoteInfo.port, remoteInfo.address);
  } catch (err) {
    const errorResponse = (err as Error)?.message || err;
    console.error(errorResponse);

    const bytesToSend = Buffer.from(errorResponse as string);
    socket.send(bytesToSend, remoteInfo.port, remoteInfo.address);
  }
});
