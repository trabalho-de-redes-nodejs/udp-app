import { Socket } from 'dgram';
import fs from 'fs';
import path from 'path';

import { createFileWithRandomContent } from 'utils/files';
import { Reader } from 'client/lib/Reader';
import { Printer } from 'client/lib/Printer';

const directory = 'src/client/input';

const sendFile = async (client: Socket): Promise<void> => {
  try {
    const fileName = await chooseFileOrCreate().then((file) => file);
    console.log(fileName, client);
  } catch (err) {
    console.error(err);
  }
};

const chooseFileOrCreate = async (): Promise<string | void | Error> => {
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

export { sendFile };
