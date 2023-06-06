import { Socket } from 'dgram';
import fs from 'fs';

import { Reader } from 'client/lib/Reader';
import { Printer } from 'client/lib/Printer';

const sendFile = (client: Socket): void => {
  try {
    chooseFile();
  } catch (err) {
    Printer.error(err);
  }
};

const chooseFile = (): string => {
  const directory = '../../input';

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directory}: ${err}`);
      return;
    }

    if (files.length === 0) {
      console.error(`Error reading directory ${directory}: No files found`);
      console.error(`Please create a file in ${directory} now:`);

      return;
    }

    files.forEach((file, index) => {
      const filePath = path.join(directory, file);
      fs.stat(filePath, (error, stats) => {
        if (error) {
          console.error(`Error getting file information for ${filePath}: ${error}`);
          return;
        }

        if (stats.isFile()) {
          console.log(`[${index}] ${file} ${stats.size} bytes`);
        }
      });
    });
  });
};

const createEmptyFileByInput = async (): Promise<boolean> => {
  const fileName = Reader.string('Type a file name to create:');
  const fileSize = Reader.integer('Type a file size to create (in bytes):', { min: 0 });
};

const createEmptyFileOfSize = (fileName: string, size: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const fh = fs.openSync(fileName, 'w');
    fs.writeSync(fh, 'ok', Math.max(0, size - 2));
    fs.closeSync(fh);
    resolve(true);
  });
};

export { sendFile };
