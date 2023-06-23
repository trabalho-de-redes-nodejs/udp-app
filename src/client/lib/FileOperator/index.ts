import { createFile } from './createFile';
import deleteFile from './deleteFile';

interface IFileOperator {
  createFile: (fileName: string, fileSize: number) => Promise<string>;
  deleteFile: (fileName: string) => Promise<boolean>;
}

const FileOperator: IFileOperator = {
  createFile: createFile,
  deleteFile: deleteFile,
};

export default FileOperator;
