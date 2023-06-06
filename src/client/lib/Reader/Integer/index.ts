import readlineSync from 'readline-sync';

const readInteger = (message = '', options?: IReaderOptionsInt): number => {
  while (true) {
    try {
      const input = readlineSync.question(message);

      const processedValue = validateInteger(input, options);

      if (processedValue instanceof Error) {
        console.error(processedValue.message);
        continue;
      }

      return processedValue;
    } catch (err) {
      console.error(err);
    }
  }
};

const validateInteger = (input: any, options?: IReaderOptionsInt): number | Error => {
  const { min, max } = options ?? {};

  const integer = parseInt(`${input}`);

  if (isNaN(integer)) {
    throw new Error('Invalid input. Please enter an integer.');
  }

  if (min !== undefined && integer < min) {
    throw new Error(`Invalid input. Please enter an integer greater than or equal to ${min}.`);
  }

  if (max !== undefined && integer > max) {
    throw new Error(`Invalid input. Please enter an integer less than or equal to ${max}.`);
  }

  return integer;
};

export { readInteger, validateInteger };
