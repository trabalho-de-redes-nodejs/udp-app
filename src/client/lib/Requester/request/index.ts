import { Socket } from 'dgram';
import Printer from 'client/lib/Printer';
import { serverAddress, serverPort } from 'config/config';

const request = (client: Socket, data: IRequest): Promise<any> => {
  return new Promise((resolve, reject) => {
    const bytesToSend = Buffer.from(JSON.stringify(data));

    client.send(bytesToSend, 0, bytesToSend.length, serverPort, serverAddress, (err) => {
      if (err) {
        reject(err);
      }

      client.on('message', (msgFromServer) => {
        Printer.serverResponseLog(`${msgFromServer}`);
        console.log(msgFromServer);
        resolve(msgFromServer);
      });
    });
  });
};

export default request;
