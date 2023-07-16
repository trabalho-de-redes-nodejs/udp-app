interface ArbitraryError {
  chanceToError: (errorPercentage: number) => boolean;
}

const ArbitraryError: ArbitraryError = {
  chanceToError: (errorPercentage: number): boolean => {
    if (errorPercentage < 0 || errorPercentage > 100) {
      throw new Error('Error percentage must be between 0 and 100.');
    }

    const randomNumber = Math.random() * 100;

    return randomNumber <= errorPercentage;
  },
};

export default ArbitraryError;
