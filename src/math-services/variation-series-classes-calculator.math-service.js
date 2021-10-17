export function calculateVariationSeriesClasses (dataset, numberOfClasses) {
  const datasetMin = Math.min(...dataset);
  const datasetMax = Math.max(...dataset);
  const datasetRange = datasetMax - datasetMin;
  const classStep = datasetRange / numberOfClasses;

  const variationSeriesClasses = [];

  for (let i = 1; i <= numberOfClasses; i++) {
    const isLastClass = i === numberOfClasses;

    const lowerBound = variationSeriesClasses.at(-1)?.upperBound ?? datasetMin;
    const upperBound = isLastClass ? datasetMax : lowerBound + classStep;
    const frequency = numberOfElementsInBounds(dataset, lowerBound, isLastClass ? Infinity : upperBound);
    const relativeFrequency = frequency / dataset.length;

    variationSeriesClasses.push({
      classNumber: i,
      lowerBound,
      upperBound,
      frequency,
      relativeFrequency
    });
  }

  return variationSeriesClasses;
}

function numberOfElementsInBounds (array, min, max) {
  return array.filter(number => number >= min && number < max).length;
}
