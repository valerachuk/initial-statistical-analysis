export { parseDataset1D } from './dataset-parser.math-service';
export { calculateVariationSeries } from './variation-series-calculator.math-service';
export { calculateOptimalNumberOfClasses } from './optimal-number-of-classes-calculator.math-service';
export { calculateVariationSeriesClasses } from './variation-series-classes-calculator.math-service';
export { defaultRound } from './round.math-service';
export {
  sum,
  mean,
  median,
  variance,
  varianceBiased,
  standardDeviation,
  standardDeviationBiased,
  coefficientOfVariation,
  coefficientOfSkewness,
  coefficientOfKurtosis,
  coefficientOfAntikurtosis
} from './statistical-characteristics/statistical-characteristics.math-services';
export { createKernelDensityEstimation, calculateOptimalBandwidth } from './kde.math-service';
export { normStdDistributionInv, studentDistributionInv } from './quantiles.math-service';
export {
  standardDeviationMean,
  standardDeviationStandardDeviation,
  standardDeviationCoefficientOfSkewness,
  standardDeviationCoefficientOfKurtosis
} from './statistical-characteristics/standard-deviations.math-services';
export {
  confidenceIntervalMean,
  confidenceIntervalMedian,
  confidenceIntervalStandardDeviation,
  confidenceIntervalCoefficientOfSkewness,
  confidenceIntervalCoefficientKurtosis
} from './statistical-characteristics/confidence-intervals.math-service';
export {
  createLaplaceProbabilityFunction,
  createLaplaceProbabilityDensityFunction,
  computeLaplaceMu,
  computeLaplaceLambda,
  computeLaplaceMuStandardDeviation,
  computeLaplaceLambdaStandardDeviation,
  computeLaplaceMuConfidenceInterval,
  computeLaplaceLambdaConfidenceInterval,
  createEcdfToProbabilityPaper
} from './laplace-distribution.math-services';
