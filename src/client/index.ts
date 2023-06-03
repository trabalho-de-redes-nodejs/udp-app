import { Printer } from './lib/Printer';
import { INavigation } from '@/@types/client/navigation';

const menu: INavigation[] = [
  {
    title: 'Send a String to the Server',
    run: () => {
      console.log('Send a String to the Server');
    }
  }
];

const main = (): void => {
  Printer.menu(menu);
};

main();
