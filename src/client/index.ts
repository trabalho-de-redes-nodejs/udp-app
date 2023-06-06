import dgram, { Socket } from 'dgram';
import { Listener } from './lib/Listener';
import { Printer } from './lib/Printer';
import { sendMessage } from './services/message';

const client: Socket = dgram.createSocket('udp4');

const menu: INavigation[] = [
  {
    title: 'Send a String to the Server',
    run: (client: Socket) => {
      sendMessage(client);
    },
  },
];

const main = (): void => {
  Printer.menu(menu);

  const option = Listener.int('Select an option:', { min: 0, max: menu.length - 1 });

  if (menu[option]) {
    menu[option].run(client);
  }

  Printer.spacer();
};

main();
