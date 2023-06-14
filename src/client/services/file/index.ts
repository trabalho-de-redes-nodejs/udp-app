import { Socket } from 'dgram';
import fs from 'fs';
import path from 'path';

import { createFileWithRandomContent } from 'utils/files';
import Reader from 'client/lib/Reader';
import Printer from 'client/lib/Printer';
import FileSplitter from 'client/lib/FileSplitter';
import { serverAddress, serverPort } from 'config/config';

const directory = 'src/client/input';

const sendFile = async (client: Socket): Promise<void> => {
  try {
    const fileName: string = await chooseFileOrCreate().then((file) => file);

    const splittedFile = await FileSplitter.splitFileBySize(fileName, 1024)
      .then((names) => names)
      .catch((err) => {
        console.error(err);
        return [];
      });

    if (!splittedFile || splittedFile === undefined || (splittedFile as string[]).length === 0) {
      return;
    }

    sendFileToServerByParts(client, splittedFile as string[])
      .catch((err) => console.error(err))
      .finally(() => {
        FileSplitter.deleteFilesFromArray(splittedFile as string[]);
      });
  } catch (err) {
    console.error(err);
  }
};

const chooseFileOrCreate = async (): Promise<string> => {
  const getFilesFromDirectory = (directory: string): string[] => {
    if (!fs.existsSync(directory)) {
      console.error(`Error reading directory ${directory}: Directory does not exist`);

      fs.mkdirSync(directory);

      return [];
    }

    return fs.readdirSync(directory);
  };

  const files: string[] = getFilesFromDirectory(directory);

  if (files.length === 0) {
    console.error(`Error reading directory ${directory}: No files found`);
  }

  Printer.menu(files, 'Files to send:');
  console.info(`[${files.length}] Create a new file`);

  const fileIndex = Reader.integer('Choose a file to send:', { min: 0, max: files.length });

  if (fileIndex === files.length) {
    return await createFileByInput();
  }

  return path.join(directory, files[fileIndex]);
};

const createFileByInput = async (): Promise<string> => {
  const fileName: string = Reader.fileName('Type a file name to create:');
  const fileSize: number = Reader.integer('Type a file size to create (in bytes):', { min: 0 });

  // eslint-disable-next-line
  return await createFileWithRandomContent(`${directory}/${fileName}`, fileSize)
    .then(() => {
      return path.join(directory, fileName);
    })
    .catch((err: any) => {
      console.error(err);
      return '';
    });
};

const sendFileToServerByParts = async (client: Socket, names: string[]): Promise<void> => {
  sendFilePartToServer(client, names[0]);
};

const sendFilePartToServer = async (client: Socket, name: string): Promise<void> => {
  try {
    const msgFromClient: string = fs.readFileSync(name, { encoding: 'utf-8' });

    console.info(`Sending file ${name} to server...`);

    const bytesToSend = Buffer.from(msgFromClient);

    console.log(bytesToSend.length);

    client.send(bytesToSend, 0, bytesToSend.length, serverPort, serverAddress, (err) => {
      if (err) {
        throw err;
      }

      Printer.requestLog(msgFromClient);

      client.on('message', (msgFromServer) => {
        Printer.serverResponseLog(`${msgFromServer}`);
        client.close();
      });
    });
  } catch (err) {
    console.error(err);
  }
};

export { sendFile };
