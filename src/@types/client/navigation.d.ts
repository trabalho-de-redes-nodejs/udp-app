interface INavigation {
  title: string;
  run: () => Promise<void>;
}
