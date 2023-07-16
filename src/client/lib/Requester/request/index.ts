import dgram, { Socket } from 'dgram';
import { serverAddress, serverPort } from 'config/config';

const request = (data: IRequest): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const bytesToSend = Buffer.from(JSON.stringify(data));
    const client: Socket = dgram.createSocket('udp4');

    client.send(bytesToSend, 0, bytesToSend.length, serverPort, serverAddress, (err) => {
      if (err) {
        reject(err);
      }

      client.on('message', (msgFromServer) => {
        resolve(msgFromServer);
        client.close();
      });
    });
  });
};

export default request;
