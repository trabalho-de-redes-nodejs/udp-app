import dgram from 'dgram';
import message from './services/message';
import file from './services/file';
import { serverAddress, serverPort } from 'config/config';
import Protocoler from 'shared/lib/Protocoler';

const socket = dgram.createSocket('udp4');
let seqClient: number, seqServer: number, ackClient: number, ackServer: number;

const respond = (data: IRequest, remoteInfo: dgram.RemoteInfo): string | number => {
  switch (data.body.type) {
    case 'message':
      return message(data.body.data, remoteInfo);
    case 'file':
      return file(data, remoteInfo);
    default:
      throw new Error('Invalid request type');
  }
};

socket.bind(serverPort, serverAddress, () => {
  console.log(`Server listening on ${serverAddress}:${serverPort}`);
});

const secondWay = async (data: IRequest, remoteInfo: dgram.RemoteInfo): Promise<void> => {
  seqServer = 0;
  ackServer = seqClient + 1;
  const secondWay: IRequest = Protocoler.buildRequestObject(seqServer, ackServer, '', 'SYN');

  const secondWayToString = JSON.stringify(secondWay);
  socket.send(secondWayToString, remoteInfo.port, remoteInfo.address);

  //   console.log('Second Way');
  //   console.log('Seq Cliente: ', seqClient);
  //   console.log('Ack Cliente: ', ackClient);
  //   console.log('Seq Servidor: ', seqServer);
  //   console.log('Ack Servidor: ', ackServer);
};

socket.on('message', (message: string, remoteInfo: dgram.RemoteInfo) => {
  try {
    const data: IRequest = Protocoler.getRequestObject(message);
    if (!data) {
      throw data;
    }

    seqClient = data.header.seq;
    ackClient = data.header.ack;

    if (data.header.syn) {
      secondWay(data, remoteInfo);
      return;
    }

    ackServer = seqClient + 1;
    data.body.type = 'file';

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
