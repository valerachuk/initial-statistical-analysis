import { Plotly } from 'vue-plotly';
import { mapState, mapGetters } from 'vuex';
import { defaultRound } from '@math-services';

export default {
  name: 'IsaOutliersPlot',

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
        title: 'Element index'
      },
      yaxis: {
        title: 'x'
      }
      // height: 900
    },
    defaultRound
  }),

  computed: {
    ...mapState('outliers', [
      'outliersAlpha'
    ]),

    ...mapGetters('outliers', [
      'datasetNormStdInv',
      'lowerBound',
      'upperBound',
      'numbersInRangeWithIndexes',
      'numbersOutOfRangeWithIndexes'
    ]),

    datasetInRange () {
      const { indexes: x, numbers: y } = this.numbersInRangeWithIndexes;
      return { x, y };
    },

    datasetOutOfRange () {
      const { indexes: x, numbers: y } = this.numbersOutOfRangeWithIndexes;
      return { x, y };
    },

    plotlyData () {
      return [
        {
          ...this.datasetInRange,
          type: 'scatter',
          mode: 'markers',
          name: 'In bounds',
          line: { color: 'blue' }
        },
        {
          ...this.datasetOutOfRange,
          type: 'scatter',
          mode: 'markers',
          name: 'Out of bounds',
          line: { color: 'red' }
        },
        {
          x: [-Number.MAX_VALUE, Number.MAX_VALUE],
          y: [this.lowerBound, this.lowerBound],
          type: 'scatter',
          mode: 'lines',
          name: 'Lower bound',
          line: { color: 'black' }
        },
        {
          x: [-Number.MAX_VALUE, Number.MAX_VALUE],
          y: [this.upperBound, this.upperBound],
          type: 'scatter',
          mode: 'lines',
          name: 'Upper bound',
          line: { color: 'black' }
        }
      ];
    }
  }

};
