export function sum (numbers) {
  return numbers.reduce((acc, x) => acc + x, 0);
}

export function mean (numbers) {
  return sum(numbers) / numbers.length;
}

export function median (numbers) {
  const numbersLength = numbers.length;

  if (numbersLength % 2 === 0) {
    return (numbers[numbersLength / 2] + numbers[numbersLength / 2 + 1]) / 2;
  }

  return numbers[(numbersLength + 1) / 2];
}

export function variance (numbers) {
  const mean_ = mean(numbers);
  const sum_ = numbers.reduce((acc, x) => acc + (x - mean_) ** 2, 0);
  return sum_ / (numbers.length - 1);
}

export function varianceBiased (numbers) {
  const numbersLength = numbers.length;
  return variance(numbers) * (numbersLength - 1) / numbersLength;
}

export function standardDeviation (numbers) {
  return Math.sqrt(variance(numbers));
}

export function standardDeviationBiased (numbers) {
  return Math.sqrt(varianceBiased(numbers));
}

export function coefficientOfVariation (numbers) {
  return standardDeviation(numbers) / mean(numbers);
}

export function coefficientOfSkewness (numbers) {
  const mean_ = mean(numbers);
  const sum_ = numbers.reduce((acc, x) => acc + (x - mean_) ** 3, 0);
  return sum_ / (numbers.length * standardDeviationBiased(numbers) ** 3);
}

export function coefficientOfKurtosis (numbers) {
  const mean_ = mean(numbers);
  const sum_ = numbers.reduce((acc, x) => acc + (x - mean_) ** 4, 0);
  return sum_ / (numbers.length * standardDeviationBiased(numbers) ** 4) - 3;
}

export function coefficientOfAntikurtosis (numbers) {
  return 1 / Math.sqrt(coefficientOfKurtosis(numbers) + 3);
}
