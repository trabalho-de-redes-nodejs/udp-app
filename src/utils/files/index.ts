import fs from 'fs';

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

const deleteFile = (fileName: string): Promise<boolean> => {
  return new Promise((resolve) => {
    fs.unlink(fileName, (err) => {
      if (err) {
        console.error(err);
        resolve(false);
      }

      resolve(true);
    });
  });
};

export { createFileWithRandomContent, deleteFile };
