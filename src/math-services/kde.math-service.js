import { standardDeviation, sum } from './index';

export function createKernelDensityEstimation (dataset, bandwidth, kernelFunction = yepanechnikovKernel) {
  return x => kernelDensityEstimation(x, dataset, bandwidth, kernelFunction);
}

function kernelDensityEstimation (x, dataset, bandwidth, kernelFunction) {
  const kernelResults = dataset.map(xi => kernelFunction((x - xi) / bandwidth));
  return sum(kernelResults) / (dataset.length * bandwidth);
}

function yepanechnikovKernel (u) {
  if (Math.abs(u) > Math.sqrt(5)) {
    return 0;
  }

  const a = 3 / (4 * Math.sqrt(5));
  const b = (1 - (u ** 2 / 5));
  return a * b;
}

// Scott rule
export function calculateOptimalBandwidth (numbers) {
  return standardDeviation(numbers) * numbers.length ** (-1 / 5);
}
