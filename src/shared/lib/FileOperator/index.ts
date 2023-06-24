import { createFileByInput, createFileBySize } from './createFile';
import deleteFile from './deleteFile';

interface IFileOperator {
  createFileBySize: (fileName: string, fileSize: number, directory?: string) => Promise<string>;
  createFileByInput: (fileName: string, input: string, directory?: string) => Promise<string>;
  deleteFile: (fileName: string) => Promise<boolean>;
}

const FileOperator: IFileOperator = {
  createFileBySize: createFileBySize,
  createFileByInput: createFileByInput,
  deleteFile: deleteFile,
};

export default FileOperator;
