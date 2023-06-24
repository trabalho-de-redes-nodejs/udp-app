import fs from 'fs';
import path from 'path';

const clientDirectory = 'src/client/input';

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

const createFileBySize = async (fileName: string, fileSize: number): Promise<string> => {
  return await createFileWithRandomContent(`${clientDirectory}/${fileName}`, fileSize)
    .then(() => {
      return path.join(clientDirectory, fileName);
    })
    .catch((err: any) => {
      console.error((err as Error)?.message || err);

      return '';
    });
};

const createFileByInput = async (fileName: string, input: string, directory: string = clientDirectory): Promise<string> => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(directory, fileName);

    fs.writeFile(filePath, input, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(path.join(directory, fileName));
      }
    });
  });
};

export { createFileWithRandomContent, createFileBySize, createFileByInput };
