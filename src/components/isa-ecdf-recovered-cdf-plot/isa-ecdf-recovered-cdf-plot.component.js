import { Plotly } from 'vue-plotly';
import { mapGetters } from 'vuex';
import {
  createLaplaceProbabilityFunction,
  computeLaplaceLambda,
  computeLaplaceMu
} from '@math-services';
import { PLOT_RESOLUTION_DEFAULT } from '@constants';

export default {
  name: 'IsaEcdfRecoveredCdfPlot',

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
        title: 'x'
      },
      yaxis: {
        title: 'CDF (x)'
      }
      // height: 900
    }
  }),

  computed: {
    ...mapGetters(['variationSeries', 'datasetNoOutliers']),

    recoveredProbabilityToPlotlyScatter () {
      const lowerBoundX = Math.min(...this.datasetNoOutliers);
      const upperBoundX = Math.max(...this.datasetNoOutliers);
      const range = upperBoundX - lowerBoundX;
      // const histogramClassWidth = range / this.variationSeriesClassCount; // h

      const resolutionStep = range / PLOT_RESOLUTION_DEFAULT;
      const laplaceProbabilityFunction = createLaplaceProbabilityFunction(computeLaplaceLambda(this.datasetNoOutliers), computeLaplaceMu(this.datasetNoOutliers));

      const xAxis = [];
      const yAxis = [];

      for (let i = 0; i <= PLOT_RESOLUTION_DEFAULT; i++) {
        const x = lowerBoundX + resolutionStep * i;
        const y = laplaceProbabilityFunction(x);// * histogramClassWidth;

        xAxis.push(x);
        yAxis.push(y);
      }

      return {
        x: xAxis,
        y: yAxis
      };
    },

    plotlyData () {
      return [{
        x: this.variationSeries.map(x => x.value),
        y: this.variationSeries.map(x => x.ecdfValue),
        type: 'scatter',
        mode: 'lines+markers',
        line: { shape: 'hv' },
        name: 'ECDF'
      },
      {
        ...this.recoveredProbabilityToPlotlyScatter,
        type: 'scatter',
        line: { shape: 'spline' },
        name: 'Recovered CDF'
      }];
    }

  }
};
