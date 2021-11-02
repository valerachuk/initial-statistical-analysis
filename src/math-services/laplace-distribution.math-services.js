import { QUANTILE_APLPHA_DEFAULT } from '@constants';
import {
  mean,
  normStdDistributionInv
} from '@math-services';

function laplaceProbabilityFunction (x, lambda, mu) {
  if (x <= mu) {
    return Math.exp(lambda * (x - mu)) / 2;
  }

  return 1 - Math.exp(-lambda * (x - mu)) / 2;
}

function laplaceProbabilityDensityFunction (x, lambda, mu) {
  return Math.exp(-lambda * Math.abs(x - mu)) * lambda / 2;
}

export function createLaplaceProbabilityFunction (lambda, mu) {
  return x => laplaceProbabilityFunction(x, lambda, mu);
}

export function createLaplaceProbabilityDensityFunction (lambda, mu) {
  return x => laplaceProbabilityDensityFunction(x, lambda, mu);
}

export function computeLaplaceMu (dataset) {
  return mean(dataset);
}

export function computeLaplaceLambda (dataset) {
  const sqaredMean = mean(dataset.map(x => x ** 2));
  return Math.sqrt(2) / (Math.sqrt(sqaredMean - mean(dataset) ** 2));
}

export function computeLaplaceMuStandardDeviation (dataset) {
  const laplaceLambda = computeLaplaceLambda(dataset);
  return Math.sqrt(2 / (dataset.length * laplaceLambda ** 2));
}

export function computeLaplaceLambdaStandardDeviation (dataset) {
  const laplaceLambda = computeLaplaceLambda(dataset);
  return Math.sqrt(5 * laplaceLambda ** 2 / (4 * dataset.length));
}

export function computeLaplaceMuConfidenceInterval (dataset) {
  const laplaceMu = computeLaplaceMu(dataset);
  const range = normStdDistributionInv(1 - QUANTILE_APLPHA_DEFAULT / 2) * Math.sqrt(computeLaplaceLambdaStandardDeviation(dataset));
  return [laplaceMu - range, laplaceMu + range];
}

export function computeLaplaceLambdaConfidenceInterval (dataset) {
  const laplaceLambda = computeLaplaceLambda(dataset);
  const range = normStdDistributionInv(1 - QUANTILE_APLPHA_DEFAULT / 2) * Math.sqrt(computeLaplaceLambdaStandardDeviation(dataset));
  return [laplaceLambda - range, laplaceLambda + range];
}

function ecdfToProbabilityPaper (x, Fx, mu) {
  if (x <= mu) {
    return Math.log(2 * Fx);
  }

  return -Math.log(2 - 2 * Fx);
}

export function createEcdfToProbabilityPaper (dataset) {
  const mu = computeLaplaceMu(dataset);
  return (x, Fx) => ecdfToProbabilityPaper(x, Fx, mu);
}
