import { Socket } from 'dgram';
import fs from 'fs';
import { serverAddress, serverPort } from 'config/config';
import { Listener } from 'client/lib/Listener';
import { Printer } from 'client/lib/Printer';

const sendFile = (client: Socket): void => {
  try {
    createEmptyFileOfSize('src/client/assets/file.txt', 1024 * 1024 * 10, (fileErr) => {
      if (fileErr) {
        throw fileErr;
      }

      const msgFromClient = Listener.string('Type a message to send to the server:');
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
    });
  } catch (err) {
    Printer.error(err);
  }
};

const createEmptyFileOfSize = (fileName: string, size: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const fh = fs.openSync(fileName, 'w');
    fs.writeSync(fh, 'ok', Math.max(0, size - 2));
    fs.closeSync(fh);
    resolve(true);
  });
};

export { sendFile, createEmptyFileOfSize };
