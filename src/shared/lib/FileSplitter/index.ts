import { deleteFilesFromArray } from './DeleteFilesFromArray';
import mergeFile from './MergeFile';
import { splitFileBySize } from './SplitFileBySize';

interface IFileSplitter {
  splitFileBySize: (filePath: string, size: number) => Promise<string[] | Error>;
  deleteFilesFromArray: (parts: string[]) => void;
  mergeFile: (inputFiles: string[], outputFile: string) => Promise<void>;
}

const FileSplitter: IFileSplitter = {
  splitFileBySize: splitFileBySize,
  deleteFilesFromArray: deleteFilesFromArray,
  mergeFile: mergeFile,
};

export default FileSplitter;
