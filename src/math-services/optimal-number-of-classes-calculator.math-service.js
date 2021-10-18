export function calculateOptimalNumberOfClasses (datasetLength) {
  const root = datasetLength < 100 ? Math.sqrt(datasetLength) : Math.cbrt(datasetLength);
  const floor = Math.floor(root);
  const result = floor % 2 === 0 ? floor - 1 : floor;
  return Math.max(result, 1);
}
