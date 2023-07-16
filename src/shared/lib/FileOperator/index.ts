import { addContentToFile } from './addContentToFile';
import { checkIfFileExists } from './checkIfFileExists';
import { createFileByInput, createFileBySize } from './createFile';
import deleteFile from './deleteFile';

interface IFileOperator {
  createFileBySize: (fileName: string, fileSize: number, directory?: string) => Promise<string>;
  createFileByInput: (fileName: string, input: string, directory?: string) => Promise<string>;
  checkIfFileExists: (fileName: string) => boolean;
  addContentToFile: (fileName: string, content: string) => Promise<boolean>;
  deleteFile: (fileName: string) => Promise<boolean>;
}

const FileOperator: IFileOperator = {
  createFileBySize: createFileBySize,
  createFileByInput: createFileByInput,
  deleteFile: deleteFile,
  checkIfFileExists: checkIfFileExists,
  addContentToFile: addContentToFile,
};

export default FileOperator;
