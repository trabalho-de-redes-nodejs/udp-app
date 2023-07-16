import fs from 'fs';

const checkIfFileExists = (fileName: string): boolean => {
  return fs.existsSync(fileName);
};

export { checkIfFileExists };
