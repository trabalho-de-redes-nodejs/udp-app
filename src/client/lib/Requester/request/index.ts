import { Socket } from 'dgram';
import { serverAddress, serverPort } from 'config/config';

const request = (client: Socket, data: IRequest): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const bytesToSend = Buffer.from(JSON.stringify(data));

    client.send(bytesToSend, 0, bytesToSend.length, serverPort, serverAddress, (err) => {
      if (err) {
        reject(err);
      }

      client.on('message', (msgFromServer) => {
        resolve(msgFromServer);
      });
    });
  });
};

export default request;
