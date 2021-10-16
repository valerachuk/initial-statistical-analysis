const splitRegex = /\s+/;

export function parseDataset1D (stringValue) {
  const numbers = stringValue
    .split(splitRegex)
    .map(str => Number(str));

  if (numbers.length !== 0 && numbers.every(number => isFinite(number))) {
    return numbers;
  }

  return null;
};
