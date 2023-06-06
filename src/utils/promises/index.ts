const isPromise = (func: () => any | Promise<any>): boolean => {
  return typeof func === 'function' && func.constructor && func.constructor.name === 'AsyncFunction';
};

export { isPromise };
