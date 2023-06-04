export const getIntByString = (str: string): number | null => {
  const numberRegex = /\d+/g;
  const numbers = str.match(numberRegex)?.toString() ?? '';
  const parsed = parseInt(numbers);
  return isNaN(parsed) ? null : parsed;
};
