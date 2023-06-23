import fs from 'fs';

const deleteFile = (fileName: string): Promise<boolean> => {
  return new Promise((resolve) => {
    fs.unlink(fileName, (err) => {
      if (err) {
        console.error((err as Error)?.message || err);

        resolve(false);
      }

      resolve(true);
    });
  });
};

export default deleteFile;
