import readlineSync from 'readline-sync';

const readString = (message = '') => {
  const input = readlineSync.question(message);
  return input;
};

const validateString = (input: any): string | Error => {
  const parseInput = `${input}`;

  if (parseInput.trim() === '') {
    throw new Error('Invalid input. Please enter a non-empty string.');
  }

  return parseInput;
};

export { readString, validateString };
