import fs from 'fs';
import path from 'path';

const directory = 'src/client/input';

const createFileWithRandomContent = (fileName: string, size: number): Promise<boolean> => {
  const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return Array.from({ length }, () => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      return characters.charAt(randomIndex);
    }).join('');
  };

  return new Promise((resolve, reject) => {
    const content = generateRandomString(size);
    fs.writeFile(fileName, content, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};

const createFile = async (fileName: string, fileSize: number): Promise<string> => {
  return await createFileWithRandomContent(`${directory}/${fileName}`, fileSize)
    .then(() => {
      return path.join(directory, fileName);
    })
    .catch((err: any) => {
      console.error((err as Error)?.message || err);

      return '';
    });
};

export default createFile;

export { createFileWithRandomContent, createFile };
