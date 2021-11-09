import { Plotly } from 'vue-plotly';
import { mapGetters } from 'vuex';
import {
  createEcdfToProbabilityPaper,
  createLaplaceProbabilityFunction,
  computeLaplaceLambda,
  computeLaplaceMu,
  ecdfToProbabilityPaper
} from '@math-services';
import { PLOT_RESOLUTION_DEFAULT } from '@constants';

export default {
  name: 'IsaLaplaceProbabilityPaper',

  components: {
    Plotly
  },

  data: () => ({
    plotlyLayout: {
      margin: {
        l: 50,
        r: 15,
        b: 50,
        t: 15
      },
      xaxis: {
        title: 't'
      },
      yaxis: {
        title: 'z'
      }
      // height: 900
    }
  }),

  computed: {
    ...mapGetters(['variationSeries', 'datasetNoOutliers']),

    variationSeriesToProbabilityPaper () {
      const variationSeriesCopy = this.variationSeries.concat();
      variationSeriesCopy.pop();

      const ecdfToProbabilityPaper = createEcdfToProbabilityPaper(this.datasetNoOutliers);
      return {
        x: variationSeriesCopy.map(x => x.value),
        y: variationSeriesCopy.map(x => ecdfToProbabilityPaper(x.value, x.ecdfValue))
      };
    },

    recoveredProbabilityToProbabilityPaper () {
      const lowerBoundX = Math.min(...this.datasetNoOutliers);
      const upperBoundX = Math.max(...this.datasetNoOutliers);
      const range = upperBoundX - lowerBoundX;

      const resolutionStep = range / PLOT_RESOLUTION_DEFAULT;
      const laplaceMu = computeLaplaceMu(this.datasetNoOutliers);
      const laplaceProbabilityFunction = createLaplaceProbabilityFunction(computeLaplaceLambda(this.datasetNoOutliers), laplaceMu);

      const xAxis = [];
      const yAxis = [];

      for (let i = 0; i <= PLOT_RESOLUTION_DEFAULT; i++) {
        const x = lowerBoundX + resolutionStep * i;
        const y = ecdfToProbabilityPaper(x, laplaceProbabilityFunction(x), laplaceMu);

        xAxis.push(x);
        yAxis.push(y);
      }

      return {
        x: xAxis,
        y: yAxis
      };
    },

    plotlyData () {
      return [
        {
          ...this.variationSeriesToProbabilityPaper,
          type: 'scatter',
          mode: 'markers',
          name: 'ECDF'
        }, {
          ...this.recoveredProbabilityToProbabilityPaper,
          type: 'scatter',
          name: 'Recovered CDF'
        }
      ];
    }

  }
};
