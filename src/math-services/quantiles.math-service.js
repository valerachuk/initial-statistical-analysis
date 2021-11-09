export function normStdDistributionInv (probability) {
  function phi (a) {
    const t = Math.sqrt(-2 * Math.log(a));

    const c0 = 2.515_517;
    const c1 = 0.802_853;
    const c2 = 0.010_328;

    const d1 = 1.432_788;
    const d2 = 0.189_265_9;
    const d3 = 0.001_308;

    const numerator = c0 + c1 * t + c2 * t ** 2;
    const denominator = 1 + d1 * t + d2 * t ** 2 + d3 * t ** 3;

    return t - numerator / denominator;
  }

  return probability <= 0.5
    ? -phi(probability)
    : phi(1 - probability);
}

export function studentDistributionInv (probability, degFreedom) {
  const up = normStdDistributionInv(probability);

  function g1 (up_) {
    return (up_ ** 3 + up_) / 4;
  }

  function g2 (up_) {
    return (5 * up_ ** 5 + 16 * up_ ** 3 + 3 * up_) / 96;
  }

  function g3 (up_) {
    return (3 * up_ ** 7 + 19 * up_ ** 5 + 17 * up_ ** 3 - 15 * up_) / 384;
  }

  function g4 (up_) {
    return (79 * up_ ** 9 + 779 * up_ ** 7 + 1482 * up_ ** 5 - 1920 * up_ ** 3 - 945 * up_) / 92_160;
  }

  return up + g1(up) / degFreedom + g2(up) / degFreedom ** 2 + g3(up) / degFreedom ** 3 + g4(up) / degFreedom ** 4;
}

export function pearsonDistributionInv (probability, degFreedom) { // Chi sqared
  const a = 2 / (9 * degFreedom);
  return degFreedom * (1 - a + normStdDistributionInv(probability) * Math.sqrt(a)) ** 3;
}
