import Reader from './lib/Reader';
import Printer from './lib/Printer';
import { sendFile } from './services/file';

const menu: INavigation[] = [
  {
    title: 'Send a File to the Server',
    run: async () => {
      await sendFile().catch((err) => console.error(err));
    },
  },
  {
    title: 'Exit',
    run: () => {
      console.info('Bye!');
      process.exit(0);
    },
  },
];

const main = (): void => {
  Printer.menu(menu.map((item) => item.title));

  const option: number = Reader.integer('Select an option:', { min: 0, max: menu.length - 1 });

  if (!menu[option]) {
    console.info('Invalid option');
    main();
  }

  menu[option].run().then(() => {
    Printer.spacer();
    main();
  });
};

main();
