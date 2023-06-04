import dgram from 'dgram';
import dotenv from 'dotenv';
import { serverAddress, serverPort } from 'config/config';

dotenv.config();
const socket = dgram.createSocket('udp4');

const msgFromServer = 'STATUS 200';
const bytesToSend = Buffer.from(msgFromServer);

socket.bind(serverPort, serverAddress, () => {
  console.log(`Server listening on ${serverAddress}:${serverPort}`);
});

socket.on('message', (message: string, remoteInfo) => {
  const clientMsg = `message ${message} from ${remoteInfo.address}:${remoteInfo.port}`;
  console.log(clientMsg);
  socket.send(bytesToSend, remoteInfo.port, remoteInfo.address);
});
