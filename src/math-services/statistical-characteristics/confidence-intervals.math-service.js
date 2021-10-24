import {
  normStdDistributionInv,
  studentDistributionInv,

  mean,
  standardDeviation,
  coefficientOfSkewness,
  coefficientOfKurtosis,

  standardDeviationMean,
  standardDeviationStandardDeviation,
  standardDeviationCoefficientOfSkewness,
  standardDeviationCoefficientOfKurtosis
} from '@math-services';

const APLPHA = 0.05;

function confidenceIntervalDefault (numbers, valueFunction, standardDeviationFunction) {
  const range = studentDistributionInv(1 - APLPHA, numbers.length - 1) * standardDeviationFunction(numbers);
  const value = valueFunction(numbers);
  return [value - range, value + range];
}

export function confidenceIntervalMean (numbers) {
  return confidenceIntervalDefault(numbers, mean, standardDeviationMean);
}

export function confidenceIntervalMedian (numbers) {
  const numbersLength = numbers.length;
  const range = normStdDistributionInv(1 - APLPHA / 2) * Math.sqrt(numbersLength) / 2;

  const j = Math.round(numbersLength / 2 - range);
  const k = Math.round(numbersLength / 2 + range);

  const sortedNumbers = numbers
    .concat()
    .sort((a, b) => a - b);

  return [sortedNumbers[j], sortedNumbers[k]];
}

export function confidenceIntervalStandardDeviation (numbers) {
  return confidenceIntervalDefault(numbers, standardDeviation, standardDeviationStandardDeviation);
}

export function confidenceIntervalCoefficientOfSkewness (numbers) {
  return confidenceIntervalDefault(numbers, coefficientOfSkewness, standardDeviationCoefficientOfSkewness);
}

export function confidenceIntervalCoefficientKurtosis (numbers) {
  return confidenceIntervalDefault(numbers, coefficientOfKurtosis, standardDeviationCoefficientOfKurtosis);
}
