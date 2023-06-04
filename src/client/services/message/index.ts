import { Socket } from 'dgram';
import { serverAddress, serverPort } from 'config/config';
import { Listener } from 'client/lib/Listener';

const sendMessage = (client: Socket): void => {
  const msgFromClient = Listener.string('Type a message to send to the server:');
  const bytesToSend = Buffer.from(msgFromClient);

  client.send(bytesToSend, 0, bytesToSend.length, serverPort, serverAddress, (err) => {
    if (err) {
      throw err;
    }
    console.log('Sending message to server:', msgFromClient);

    client.on('message', (msgFromServer: string) => {
      const msg = `Receive Message from server ${msgFromServer}`;
      console.log(msg);
      client.close();
    });
  });
};

export { sendMessage };
