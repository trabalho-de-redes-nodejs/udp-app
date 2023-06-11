import { readFileName } from './FileName';
import { readInteger } from './Integer';
import { readString } from './String';

interface IReader {
  integer: (message?: string, options?: IReaderOptionsInt) => number;
  string: (message?: string) => string;
  fileName: (message?: string) => string;
}

const Reader: IReader = {
  integer: (message = '', options?: IReaderOptionsInt) => readInteger(message, options),
  string: (message = '') => readString(message),
  fileName: (message = '') => readFileName(message),
};

export default Reader;
