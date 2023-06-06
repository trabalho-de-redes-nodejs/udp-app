import readlineSync from 'readline-sync';
import { Printer } from '../Printer';

interface IListener {
  int: (message?: string, options?: IListenerOptionsInt) => number;
  string: (message?: string) => string;
}

export const Listener: IListener = {
  int: (message = '', options?: IListenerOptionsInt) => {
    const { min, max } = options ?? {};

    while (true) {
      const input = readlineSync.question(message);
      const integer = parseInt(input);

      if (isNaN(integer)) {
        Printer.error('Invalid input. Please enter an integer.');
        continue;
      }

      if (min !== undefined && integer < min) {
        Printer.error(`Invalid input. Please enter an integer greater than or equal to ${min}.`);
        continue;
      }

      if (max !== undefined && integer > max) {
        Printer.error(`Invalid input. Please enter an integer less than or equal to ${max}.`);
        continue;
      }

      return integer;
    }
  },
  string: (message = '') => {
    const input = readlineSync.question(message);
    return input;
  },
};
