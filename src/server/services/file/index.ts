import FileOperator from 'shared/lib/FileOperator';

const storagePath = 'src/server/storage';

const checkIfFileExists = (fileName: string): boolean => {
  return FileOperator.checkIfFileExists(`${storagePath}/${fileName}`);
};

const addContentToFile = async (fileName: string, content: string): Promise<boolean> => {
  return FileOperator.addContentToFile(`${storagePath}/${fileName}`, content);
};

const buildFile = async (buffer: any, fileName = 'file.txt'): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
  await FileOperator.createFileByInput(fileName, buffer.getBuffer(), storagePath);
};

export { buildFile, checkIfFileExists, addContentToFile };
