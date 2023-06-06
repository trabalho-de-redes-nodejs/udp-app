import { serverAddress, serverPort } from 'config/config';

interface IPrinter {
  menu: (labels: string[], title?: string) => void;
  spacer: () => void;
  requestLog: (requestData: string) => void;
  serverResponseLog: (responseData: string) => void;
}

export const Printer: IPrinter = {
  menu: (labels: string[], title = 'Menu'): void => {
    console.info(`|----------------| ${title} |----------------|\n`);
    const menuString: string = labels.map((item: string, index: number) => `[${index}] ${item}\n`).join('');
    console.info(menuString);
  },

  spacer: (): void => {
    console.info('\n\n\n');
  },
  requestLog: (requestData: any): void => {
    console.log(`Sending message < `, requestData, ` > to server ${serverAddress}:${serverPort}`);
  },
  serverResponseLog: (responseData: any): void => {
    console.log(`Receive Message from server: `, responseData);
  },
};
