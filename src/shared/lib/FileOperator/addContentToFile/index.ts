import fs from 'fs';

const addContentToFile = (fileName: string, content: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.appendFile(fileName, content, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};

export { addContentToFile };
