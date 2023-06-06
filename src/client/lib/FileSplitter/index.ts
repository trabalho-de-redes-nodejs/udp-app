/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import splitFile from 'split-file';

interface IFileSplitter {
  splitFileBySize: (filePath: string, size: number) => Promise<string[] | Error>;
}

const FileSplitter: IFileSplitter = {
  splitFileBySize: async (filePath: string, size: number): Promise<string[] | Error> => {
    const splittedFile: string[] | void = await splitFile
      .splitFileBySize(filePath, size)
      .then((names: string[]) => names)
      .catch((err: any) => {
        console.error(err);
      });

    if (!splittedFile) throw new Error('Error splitting file');

    return splittedFile;
  },
};

export { FileSplitter };
