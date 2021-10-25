import { mapGetters } from 'vuex';
import {
  mean,
  median,
  standardDeviation,
  coefficientOfSkewness,
  coefficientOfKurtosis,
  coefficientOfAntikurtosis,

  standardDeviationMean,
  standardDeviationStandardDeviation,
  standardDeviationCoefficientOfSkewness,
  standardDeviationCoefficientOfKurtosis,

  confidenceIntervalMean,
  confidenceIntervalMedian,
  confidenceIntervalStandardDeviation,
  confidenceIntervalCoefficientOfSkewness,
  confidenceIntervalCoefficientKurtosis,

  defaultRound
} from '@math-services';

export default {
  name: 'StatisticalCharacteristics',

  data: () => ({
    statisticalCharacteristicsHeaders: [
      {
        text: 'Name',
        value: 'name',
        sortable: false
      },
      {
        text: 'Value',
        value: 'value',
        sortable: false
      },
      {
        text: 'Standard deviation',
        value: 'standardDeviation',
        sortable: false
      },
      {
        text: '95% confidence interval',
        value: 'confidenceInterval95',
        sortable: false
      }
    ],

    statisticalCharacteristicsFunctions: [
      {
        name: 'Mean',
        valueFunction: mean,
        standardDeviationFunction: standardDeviationMean,
        confidenceInterval95Function: confidenceIntervalMean
      },
      {
        name: 'Median',
        valueFunction: median,
        confidenceInterval95Function: confidenceIntervalMedian
      },
      {
        name: 'Standard deviation',
        valueFunction: standardDeviation,
        standardDeviationFunction: standardDeviationStandardDeviation,
        confidenceInterval95Function: confidenceIntervalStandardDeviation
      },
      {
        name: 'Coefficient of skewness',
        valueFunction: coefficientOfSkewness,
        standardDeviationFunction: standardDeviationCoefficientOfSkewness,
        confidenceInterval95Function: confidenceIntervalCoefficientOfSkewness
      },
      {
        name: 'Coefficient of kurtosis',
        valueFunction: coefficientOfKurtosis,
        standardDeviationFunction: standardDeviationCoefficientOfKurtosis,
        confidenceInterval95Function: confidenceIntervalCoefficientKurtosis
      },
      {
        name: 'Coefficient of antikurtosis',
        valueFunction: coefficientOfAntikurtosis
      },
      {
        name: 'Min',
        valueFunction: numbers => Math.min(...numbers)
      },
      {
        name: 'Max',
        valueFunction: numbers => Math.max(...numbers)
      }
    ]
  }),

  computed: {
    ...mapGetters(['datasetNoOutliers']),

    statisticalCharacteristics () {
      function formatConfidenceInterval (interval) {
        return `[${defaultRound(interval[0])}; ${defaultRound(interval[1])}]`;
      }

      return this.statisticalCharacteristicsFunctions.map(statFunctions => {
        const {
          valueFunction,
          standardDeviationFunction,
          confidenceInterval95Function,
          ...rest
        } = statFunctions;

        return {
          value: valueFunction == null ? '-' : defaultRound(valueFunction(this.datasetNoOutliers)),
          standardDeviation: standardDeviationFunction == null ? '-' : defaultRound(standardDeviationFunction(this.datasetNoOutliers)),
          confidenceInterval95: confidenceInterval95Function == null ? '-' : formatConfidenceInterval(confidenceInterval95Function(this.datasetNoOutliers)),
          ...rest
        };
      });
    }
  }
};
