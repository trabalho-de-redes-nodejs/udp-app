import fs from 'fs';
import FileOperator from 'shared/lib/FileOperator';

const storagePath = 'src/server/storage';

const checkIfFileExists = (fileName: string): boolean => {
  return FileOperator.checkIfFileExists(`${storagePath}/${fileName}`);
};

const addContentToFile = async (fileName: string, content: string): Promise<boolean> => {
  return FileOperator.addContentToFile(`${storagePath}/${fileName}`, content);
};

const buildFile = async (buffer: BufferControl, fileName = 'file.txt'): Promise<void> => {
  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath);
  }

  await FileOperator.createFileByInput(fileName, buffer.getBufferAsString(), storagePath);
};

export { buildFile, checkIfFileExists, addContentToFile };
