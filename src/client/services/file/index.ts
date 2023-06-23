import { Socket } from 'dgram';
import fs from 'fs';
import path from 'path';

import FileOperator from 'shared/lib/FileOperator';
import Reader from 'client/lib/Reader';
import Printer from 'client/lib/Printer';
import Requester from 'client/lib/Requester';
import FileSplitter from 'shared/lib/FileSplitter';
import Protocoler from 'shared/lib/Protocoler';

const directory = 'src/client/input';

const sendFile = async (client: Socket): Promise<void> => {
  try {
    const fileName: string = await chooseFileOrCreate().then((file) => file);
    const splittedFile = await FileSplitter.splitFileBySize(fileName, 1024)
      .then((names) => names)
      .catch((err) => {
        console.error((err as Error)?.message || err);
        return [];
      });

    if (!splittedFile || splittedFile === undefined || (splittedFile as string[]).length === 0) {
      return;
    }

    await sendFileToServerByParts(client, splittedFile as string[])
      .catch((err) => console.error(err))
      .finally(() => {
        client.close();
        FileSplitter.deleteFilesFromArray(splittedFile as string[]);
      });
  } catch (err) {
    console.error((err as Error)?.message || err);
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

  return await FileOperator.createFile(fileName, fileSize);
};

const sendFileToServerByParts = async (client: Socket, names: string[]): Promise<void> => {
  for (const name of names) {
    await sendFilePartToServer(client, name, names.indexOf(name) + 1, names.length);
  }
};

const sendFilePartToServer = async (client: Socket, name: string, index: number, total: number): Promise<void> => {
  try {
    const message: string = fs.readFileSync(name, { encoding: 'utf-8' });
    const requestObject: IRequest = Protocoler.buildRequestObject('file', total, index, message);

    console.info(`Sending file ${name} to server...`);

    await Requester.request(client, requestObject)
      .then((response: Buffer) => {
        console.log('Response:', response.toString());
      })
      .catch((err) => {
        console.error((err as Error)?.message || err);
      });
  } catch (err) {
    console.error('Error sending file to server:', err);
  }
};

export { sendFile };
