import { Plotly } from 'vue-plotly';
import { mapState, mapGetters } from 'vuex';
import {
  createLaplaceProbabilityFunction,
  computeLaplaceLambda,
  computeLaplaceMu,
  pearsonDistributionInv,
  pearsonsChiSquaredTestStatistics,
  defaultRound
} from '@math-services';
import { QUANTILE_APLPHA_DEFAULT } from '@constants';

export default {
  name: 'IsaPearsonsChiSquaredTest',

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
        title: 'Frequency'
      }
      // height: 900
    },
    QUANTILE_APLPHA_DEFAULT,
    defaultRound
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

    pearsonsQuantile () {
      return pearsonDistributionInv(1 - QUANTILE_APLPHA_DEFAULT, this.variationSeriesClasses.length - 1);
    },

    pearsonsChiSquaredTestStatistics () {
      return pearsonsChiSquaredTestStatistics(this.variationSeriesClasses, this.datasetNoOutliers);
    },

    isDistributionProbable () {
      return this.pearsonsChiSquaredTestStatistics <= this.pearsonsQuantile;
    },

    recoveredHistogramToPlotlyScatter () {
      if (this.variationSeriesClasses.length === 0) {
        return { x: [], y: [] };
      }

      const yAxis = [0];
      const xAxis = [this.variationSeriesClasses.at(0).lowerBound];

      const laplaceProbabilityFunction = createLaplaceProbabilityFunction(computeLaplaceLambda(this.datasetNoOutliers), computeLaplaceMu(this.datasetNoOutliers));

      this.variationSeriesClasses.forEach(({ lowerBound, upperBound }) => {
        xAxis.push(lowerBound, upperBound);
        const theoreticalFrequency = this.datasetNoOutliers.length * (laplaceProbabilityFunction(upperBound) - laplaceProbabilityFunction(lowerBound));
        yAxis.push(theoreticalFrequency, theoreticalFrequency);
      });

      yAxis.push(0);
      xAxis.push(xAxis.at(-1));

      return {
        x: xAxis,
        y: yAxis
      };
    },

    histogramToPlotlyScatter () {
      if (this.variationSeriesClasses.length === 0) {
        return { x: [], y: [] };
      }

      const yAxis = [0];
      const xAxis = [this.variationSeriesClasses.at(0).lowerBound];

      this.variationSeriesClasses.forEach(({ lowerBound, upperBound, frequency }) => {
        xAxis.push(lowerBound, upperBound);
        yAxis.push(frequency, frequency);
      });

      yAxis.push(0);
      xAxis.push(xAxis.at(-1));

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
          ...this.recoveredHistogramToPlotlyScatter,
          type: 'scatter',
          mode: 'lines+markers',
          fill: 'tozeroy',
          name: 'Recovered histgram'
        }
      ];
    }

  }
};
