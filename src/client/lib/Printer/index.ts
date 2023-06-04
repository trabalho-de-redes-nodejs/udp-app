interface IPrinter {
  menu: (menuData: INavigation[]) => void;
  error: (message: string) => void;
  spacer: () => void;
}

export const Printer: IPrinter = {
  menu: (menuData: INavigation[]) => {
    console.info('|----------------| Menu |----------------|\n');
    const menuString: string = menuData.map((item: INavigation, index: number) => `[${index}] ${item.title}\n`).join('');
    console.info(menuString);
  },
  error: (message: string) => {
    console.error(`Error: ${message}`);
  },
  spacer: () => {
    console.info('\n\n\n');
  }
};
