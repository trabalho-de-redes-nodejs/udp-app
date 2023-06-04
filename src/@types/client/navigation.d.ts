interface INavigation {
  title: string;
  run: (client: Socket) => void;
}
