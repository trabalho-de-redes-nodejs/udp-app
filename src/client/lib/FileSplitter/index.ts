import { deleteFilesFromArray } from './DeleteFilesFromArray';
import { splitFileBySize } from './SplitFileBySize';

interface IFileSplitter {
  splitFileBySize: (filePath: string, size: number) => Promise<string[] | Error>;
  deleteFilesFromArray: (parts: string[]) => void;
}

const FileSplitter: IFileSplitter = {
  splitFileBySize: splitFileBySize,
  deleteFilesFromArray: deleteFilesFromArray,
};

export default FileSplitter;
