import { standardDeviation } from '@math-services';

export function standardDeviationMean (numbers) {
  return standardDeviation(numbers) / Math.sqrt(numbers.length);
}

export function standardDeviationStandardDeviation (numbers) {
  return standardDeviation(numbers) / Math.sqrt(2 * numbers.length);
}

export function standardDeviationCoefficientOfSkewness (numbers) {
  const numbersLength = numbers.length;

  const numerator = 6 * (numbersLength - 2);
  const denominator = (numbersLength + 1) * (numbersLength + 3);

  return Math.sqrt(numerator / denominator);
}

export function standardDeviationCoefficientOfKurtosis (numbers) {
  const numbersLength = numbers.length;

  const numerator = 24 * numbersLength * (numbersLength - 2) * (numbersLength - 3);
  const denominator = (numbersLength + 1) ** 2 * (numbersLength + 3) * (numbersLength + 5);

  return Math.sqrt(numerator / denominator);
}
