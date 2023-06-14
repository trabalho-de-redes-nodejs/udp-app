import fs from 'fs';

const deleteFilesFromArray = (fileArray: string[]): void => {
  fileArray.forEach((file) => {
    fs.unlink(file, (err) => {
      if (err) {
        console.error(`Error deleting file ${file}: ${err}`);
      } else {
        console.log(`File ${file} deleted successfully.`);
      }
    });
  });
};

export { deleteFilesFromArray };
