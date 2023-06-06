import dgram, { Socket } from 'dgram';
import { Reader } from './lib/Reader';
import { Printer } from './lib/Printer';
import { sendMessage } from './services/message';
import { sendFile } from './services/file';

const client: Socket = dgram.createSocket('udp4');

const menu: INavigation[] = [
  {
    title: 'Send a String to the Server',
    run: (client: Socket) => {
      sendMessage(client);
    },
  },
  {
    title: 'Send a File to the Server',
    run: (client: Socket) => {
      sendFile(client);
    },
  },
];

const main = (): void => {
  Printer.menu(menu.map((item) => item.title));

  const option: number = Reader.integer('Select an option:', { min: 0, max: menu.length - 1 });

  if (menu[option]) {
    const run = menu[option].run(client);

    if (run instanceof Promise) {
      run
        .then(() => {
          console.error('Done!');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  Printer.spacer();
};

main();
