import { Socket } from 'dgram';
import fs from 'fs';
import path from 'path';

import FileOperator from 'shared/lib/FileOperator';
import Reader from 'client/lib/Reader';
import Printer from 'client/lib/Printer';
import createPipelineControl from 'client/lib/Pipeline';
import Transferor from 'client/lib/Transferor';

const directory = 'src/client/input';

const sendFile = async (client: Socket): Promise<void> => {
  try {
    const pipeline = await getPipeline();

    const transferor = Transferor(pipeline, client);

    await transferor.send();

    transferor.printData();

    // await unpackPipeline(client);
  } catch (err) {
    console.error((err as Error)?.message || err);
  }
};

const getPipeline = async (): Promise<PipelineControl> => {
  const fileName: string = await chooseFileOrCreate().then((file) => file);

  const fileData: string = fs.readFileSync(fileName).toString();

  return createPipelineControl(fileData);
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
