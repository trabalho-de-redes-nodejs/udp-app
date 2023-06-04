import { Socket } from 'dgram';
import { serverAddress, serverPort } from 'config/config';
import { Listener } from 'client/lib/Listener';
import { Printer } from 'client/lib/Printer';

const sendMessage = (client: Socket): void => {
  try {
    const msgFromClient = Listener.string('Type a message to send to the server:');
    const bytesToSend = Buffer.from(msgFromClient);

    client.send(bytesToSend, 0, bytesToSend.length, serverPort, serverAddress, (err) => {
      if (err) {
        throw err;
      }

      Printer.requestLog(msgFromClient);

      client.on('message', (msgFromServer: string) => {
        Printer.serverResponseLog(msgFromServer);
        client.close();
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export { sendMessage };
