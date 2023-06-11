const timeoutControl = (key: string, time: number, callback: () => any) => {
  console.log(`Timer started for ${key}`);

  setTimeout(() => {
    console.log(`Timer ended for ${key}`);
    callback();
  }, time);
};

export { timeoutControl };
