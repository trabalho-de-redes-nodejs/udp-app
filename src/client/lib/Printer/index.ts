import { INavigation } from '@/@types/client/navigation';

interface IPrinter {
  menu: (menuData: INavigation[]) => void;
}

export const Printer: IPrinter = {
  menu: (menuData: INavigation[]) => {
    const menuString = menuData.map((item: INavigation, index: number) => `[${index}] ${item.title}\n`).join('');
    console.log(menuString);
  }
};
