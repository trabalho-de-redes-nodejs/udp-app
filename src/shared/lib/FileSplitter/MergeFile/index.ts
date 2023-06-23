/* eslint-disable import/no-unresolved */
import splitFile from 'split-file';

const mergeFile = async (inputFiles: string[], outputFile: string): Promise<void> => {
  const mergedFile = await splitFile
    .mergeFiles(inputFiles, outputFile)
    .then(() => true)
    .catch((err: any) => {
      console.error((err as Error)?.message || err);
    });

  if (!mergedFile) throw new Error('Error splitting file');

  return;
};

export default mergeFile;
