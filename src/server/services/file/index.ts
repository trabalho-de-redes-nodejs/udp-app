import FileOperator from 'shared/lib/FileOperator';

const storagePath = 'src/server/storage';

const buildFile = (buffer: any, fileName = 'file.txt'): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
  FileOperator.createFileByInput(fileName, buffer.getBuffer(), storagePath);
};

export { buildFile };
