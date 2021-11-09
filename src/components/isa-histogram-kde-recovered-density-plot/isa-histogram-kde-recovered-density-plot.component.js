import { Plotly } from 'vue-plotly';
import { mapState, mapGetters } from 'vuex';
import {
  computeLaplaceMu,
  computeLaplaceLambda,
  createKernelDensityEstimation,
  createLaplaceProbabilityDensityFunction
} from '@math-services';
import { PLOT_RESOLUTION_DEFAULT } from '@constants';

export default {
  name: 'IsaHistogramKdeRecoveredDensityPlot',

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
        title: 'Relative frequency'
      }
      // height: 900
    }
  }),

  computed: {
    ...mapState([
      'variationSeriesClassCount',
      'kdeBandwidth'
    ]),

    ...mapGetters([
      'datasetNoOutliers',
      'variationSeriesClasses'
    ]),

    histogramToPlotlyScatter () {
      if (this.variationSeriesClasses.length === 0) {
        return { x: [], y: [] };
      }

      const yAxis = [0];
      const xAxis = [this.variationSeriesClasses.at(0).lowerBound];

      this.variationSeriesClasses.forEach(({ lowerBound, upperBound, relativeFrequency }) => {
        xAxis.push(lowerBound, upperBound);
        yAxis.push(relativeFrequency, relativeFrequency);
      });

      yAxis.push(0);
      xAxis.push(xAxis.at(-1));

      return {
        x: xAxis,
        y: yAxis
      };
    },

    kdeToPlotlyScatter () {
      const lowerBoundX = Math.min(...this.datasetNoOutliers);
      const upperBoundX = Math.max(...this.datasetNoOutliers);
      const range = upperBoundX - lowerBoundX;
      const histogramClassWidth = range / this.variationSeriesClassCount; // h

      const resolutionStep = range / PLOT_RESOLUTION_DEFAULT;
      const kernelDensityEstimation = createKernelDensityEstimation(this.datasetNoOutliers, this.kdeBandwidth);

      const xAxis = [];
      const yAxis = [];

      for (let i = 0; i <= PLOT_RESOLUTION_DEFAULT; i++) {
        const x = lowerBoundX + resolutionStep * i;
        const y = kernelDensityEstimation(x) * histogramClassWidth;

        xAxis.push(x);
        yAxis.push(y);
      }

      return {
        x: xAxis,
        y: yAxis
      };
    },

    recoveredDensityToPlotlyScatter () {
      const lowerBoundX = Math.min(...this.datasetNoOutliers);
      const upperBoundX = Math.max(...this.datasetNoOutliers);
      const range = upperBoundX - lowerBoundX;
      const histogramClassWidth = range / this.variationSeriesClassCount; // h

      const resolutionStep = range / PLOT_RESOLUTION_DEFAULT;

      const laplaceMu = computeLaplaceMu(this.datasetNoOutliers);
      const laplaceLambda = computeLaplaceLambda(this.datasetNoOutliers);
      const laplaceProbabilityDensityFunction = createLaplaceProbabilityDensityFunction(laplaceLambda, laplaceMu);

      const xAxis = [];
      const yAxis = [];

      function plotFunction (x) {
        return laplaceProbabilityDensityFunction(x) * histogramClassWidth;
      }

      for (let i = 0; i <= PLOT_RESOLUTION_DEFAULT; i++) {
        const x = lowerBoundX + resolutionStep * i;
        const y = plotFunction(x);

        xAxis.push(x);
        yAxis.push(y);
      }

      // Insert mu
      for (let i = 0; i < xAxis.length; i++) {
        if (xAxis[i] <= laplaceMu) {
          continue;
        }

        xAxis.splice(i, 0, laplaceMu);
        yAxis.splice(i, 0, plotFunction(laplaceMu));
        break;
      }

      return {
        x: xAxis,
        y: yAxis
      };
    },

    plotlyData () {
      return [
        {
          ...this.histogramToPlotlyScatter,
          type: 'scatter',
          mode: 'lines+markers',
          fill: 'tozeroy',
          name: 'Histgram'
        },
        {
          ...this.kdeToPlotlyScatter,
          type: 'scatter',
          line: { shape: 'spline' },
          name: 'KDE'
        },
        {
          ...this.recoveredDensityToPlotlyScatter,
          type: 'scatter',
          line: { shape: 'spline' },
          name: 'Recovered density'
        }
      ];
    }

  }
};
