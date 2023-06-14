/* eslint-disable import/no-unresolved */
import splitFile from 'split-file';

const splitFileBySize = async (filePath: string, size: number): Promise<string[] | Error> => {
  const splittedFile: string[] | void = await splitFile
    .splitFileBySize(filePath, size)
    .then((names: string[]) => names)
    .catch((err: any) => {
      console.error(err);
    });

  if (!splittedFile) throw new Error('Error splitting file');

  return splittedFile;
};

export { splitFileBySize };
