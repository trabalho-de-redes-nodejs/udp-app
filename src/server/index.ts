import dgram from 'dgram';
import message from './services/message';
import file from './services/file';
import { serverAddress, serverPort } from 'config/config';
import Protocoler from 'shared/lib/Protocoler';

const socket = dgram.createSocket('udp4');

const respond = (data: IRequest, remoteInfo: dgram.RemoteInfo): string | number => {
  switch (data.header.type) {
    case 'message':
      return message(data.body, remoteInfo);
    case 'file':
      return file(data, remoteInfo);
    default:
      throw new Error('Invalid request type');
  }
};

socket.bind(serverPort, serverAddress, () => {
  console.log(`Server listening on ${serverAddress}:${serverPort}`);
});

socket.on('message', (message: string, remoteInfo: dgram.RemoteInfo) => {
  try {
    console.log(JSON.parse(message));
    const data: IRequest = Protocoler.getRequestObject(message);

    if (!data) {
      throw data;
    }

    const responseMessage = respond(data, remoteInfo);

    const bytesToSend = Buffer.from(`${responseMessage}`);
    socket.send(bytesToSend, remoteInfo.port, remoteInfo.address);
  } catch (err) {
    const errorResponse = (err as Error)?.message || err;
    console.error(errorResponse);

    const bytesToSend = Buffer.from(errorResponse as string);
    socket.send(bytesToSend, remoteInfo.port, remoteInfo.address);
  }
});
