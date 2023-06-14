import readlineSync from 'readline-sync';

const validExtensions = ['.txt', '.doc', '.pdf', '.bin', '.json', '.js', '.ts', '.html', '.png', '.jpg', '.md', '.xml', '.csv'];

const readFileName = (message = '') => {
  while (true) {
    try {
      const input = readlineSync.question(message);

      const processedValue = validateFileName(input);

      if (processedValue instanceof Error) {
        console.info(processedValue.message);
        continue;
      }

      return processedValue;
    } catch (err: any) {
      // eslint-disable-next-line
      console.error(err.message);
    }
  }
};

const validateFileName = (fileName: string): string | Error => {
  if (fileName.trim() === '') {
    throw new Error('Invalid file name. Please enter a non-empty string.');
  }

  const invalidChars = /[\\/|:*?"<>]/;
  if (invalidChars.test(fileName)) {
    throw new Error('Invalid file name. Please remove any invalid characters (\\/|:*?"<>).');
  }

  const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  if (!validExtensions.includes(fileExtension)) {
    throw new Error(
      `Invalid file name. Please use a valid file extension (${validExtensions.join(', ').replace(/, ([^,]*)$/, ' or $1')}).`
    );
  }

  return fileName;
};

export { validExtensions, validateFileName, readFileName };
