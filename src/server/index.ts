import dgram from 'dgram';
import dotenv from 'dotenv';
import { serverAddress, serverPort } from 'config/config';

dotenv.config();
const socket = dgram.createSocket('udp4');

const msgFromServer = 'Oi UDP Cliente';
const bytesToSend = Buffer.from(msgFromServer);

socket.bind(serverPort, serverAddress, () => {
  console.log(`Server listening on ${serverAddress}:${serverPort}`);
});

socket.on('message', (message: string, remoteInfo) => {
  const clientMsg = `Mensagem do Cliente: ${message}`;
  const clientIP = `Endereco IP do Cliente: ${remoteInfo.address}:${remoteInfo.port}`;

  console.log(clientMsg);
  console.log(clientIP);

  socket.send(bytesToSend, remoteInfo.port, remoteInfo.address);
});
