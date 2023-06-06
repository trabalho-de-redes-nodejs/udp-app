interface INavigation {
  title: string;
  run: (client: Socket) => Promise<void>;
}
