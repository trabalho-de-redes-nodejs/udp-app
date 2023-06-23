import dgram, { Socket } from 'dgram';
import Reader from './lib/Reader';
import Printer from './lib/Printer';
import { sendMessage } from './services/message';
import { sendFile } from './services/file';

const client: Socket = dgram.createSocket('udp4');

const menu: INavigation[] = [
  {
    title: 'Send a String to the Server',
    run: async (client: Socket) => {
      await sendMessage(client);
    },
  },
  {
    title: 'Send a File to the Server',
    run: async (client: Socket) => {
      await sendFile(client).catch((err) => console.error(err));
    },
  },
  {
    title: 'Exit',
    run: () => {
      client.close();
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

  menu[option].run(client).then(() => {
    Printer.spacer();
    main();
  });
};

main();
