export function round (number, decimalPlaces) {
  return Math.round((number + Number.EPSILON) * 10 ** decimalPlaces) / 10 ** decimalPlaces;
}

export function defaultRound (number) {
  return round(number, 3);
}
