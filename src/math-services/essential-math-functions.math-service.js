export function sum (numbers) {
  return numbers.reduce((acc, x) => acc + x, 0);
}

export function mean (numbers) {
  return sum(numbers) / numbers.length;
}

export function variance (numbers) {
  const mean_ = mean(numbers);
  const sum_ = numbers.reduce((acc, x) => acc + (x - mean_) ** 2, 0);
  return sum_ / (numbers.length - 1);
}

export function standardDeviation (numbers) {
  return Math.sqrt(variance(numbers));
}

export function coefficientOfVariation (numbers) {
  return standardDeviation(numbers) / mean(numbers);
}
