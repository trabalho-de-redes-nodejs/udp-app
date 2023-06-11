const calcRTT = (estimatedRTT: number, devRTT: number): number => {
  return estimatedRTT + 4 * devRTT;
};

export { calcRTT };
