import { mapGetters } from 'vuex';
import {
  defaultRound,

  computeLaplaceMu,
  computeLaplaceLambda,

  computeLaplaceMuStandardDeviation,
  computeLaplaceLambdaStandardDeviation,

  computeLaplaceMuConfidenceInterval,
  computeLaplaceLambdaConfidenceInterval
} from '@math-services';

export default {
  name: 'IsaLaplaceProbabilityFunctionParameters',

  data: () => ({
    headers: [
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

    parametersFunctions: [
      {
        name: 'μ (mu)',
        valueFunction: computeLaplaceMu,
        standardDeviationFunction: computeLaplaceMuStandardDeviation,
        confidenceInterval95Function: computeLaplaceMuConfidenceInterval
      },
      {
        name: 'λ (lambda)',
        valueFunction: computeLaplaceLambda,
        standardDeviationFunction: computeLaplaceLambdaStandardDeviation,
        confidenceInterval95Function: computeLaplaceLambdaConfidenceInterval
      }
    ]
  }),

  computed: {
    ...mapGetters(['datasetNoOutliers']),

    parameters () {
      function formatConfidenceInterval (interval) {
        return `[${defaultRound(interval[0])}; ${defaultRound(interval[1])}]`;
      }

      return this.parametersFunctions.map(statFunctions => {
        const {
          valueFunction,
          standardDeviationFunction,
          confidenceInterval95Function,
          ...rest
        } = statFunctions;

        return {
          value: defaultRound(valueFunction(this.datasetNoOutliers)),
          standardDeviation: defaultRound(standardDeviationFunction(this.datasetNoOutliers)),
          confidenceInterval95: formatConfidenceInterval(confidenceInterval95Function(this.datasetNoOutliers)),
          ...rest
        };
      });
    }
  }
};
