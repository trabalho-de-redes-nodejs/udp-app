import { Socket } from 'dgram';
import { Reader } from 'client/lib/Reader';
import { serverAddress, serverPort } from 'config/config';
import { Printer } from 'client/lib/Printer';

const sendMessage = (client: Socket): void => {
  try {
    const msgFromClient: string = Reader.string('Type a message to send to the server:');
    const bytesToSend = Buffer.from(msgFromClient);

    client.send(bytesToSend, 0, bytesToSend.length, serverPort, serverAddress, (err) => {
      if (err) {
        throw err;
      }

      Printer.requestLog(msgFromClient);

      client.on('message', (msgFromServer: any) => {
        Printer.serverResponseLog(`${msgFromServer}`);
        client.close();
      });
    });
  } catch (err) {
    console.error(err);
  }
};

export { sendMessage };
