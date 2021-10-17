export function calculateVariationSeries (series) {
  const sortedSeries = series
    .concat()
    .sort((a, b) => a - b);

  const variationSeries = [];
  const seriesLength = sortedSeries.length;
  let seriesCounter = 0;

  sortedSeries.forEach(value => {
    const lastPushed = variationSeries.at(-1);

    if (lastPushed != null && lastPushed.value === value) {
      lastPushed.frequency++;
      lastPushed.relativeFrequency = lastPushed.frequency / seriesLength;
      lastPushed.ecdfValue = (variationSeries.at(-2)?.ecdfValue ?? 0) + lastPushed.relativeFrequency;
      return;
    }

    const initialRelativeFrequency = 1 / seriesLength;
    variationSeries.push({
      value,
      frequency: 1,
      relativeFrequency: initialRelativeFrequency,
      seriesNumber: ++seriesCounter,
      ecdfValue: (lastPushed?.ecdfValue ?? 0) + initialRelativeFrequency
    });
  });

  return variationSeries;
}
