import { Socket } from 'dgram';
import fs from 'fs';
import path from 'path';

import FileOperator from 'shared/lib/FileOperator';
import Reader from 'client/lib/Reader';
import Printer from 'client/lib/Printer';
import FileSplitter from 'shared/lib/FileSplitter';
import createPipelineControl from 'client/lib/Pipeline';
import Transferor from 'client/lib/Transferor';

const directory = 'src/client/input';
const pipeline = createPipelineControl();

const sendFile = async (client: Socket): Promise<void> => {
  try {
    await fillPipeline();

    const transferor = Transferor(pipeline, client);

    await transferor.send();

    // await unpackPipeline(client);
  } catch (err) {
    console.error((err as Error)?.message || err);
  }
};

const fillPipeline = async (): Promise<void> => {
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

  (splittedFile as string[]).forEach((file) => pipeline.addItem(file));
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

  return await FileOperator.createFileBySize(fileName, fileSize);
};

export { sendFile };
