import { Plotly } from 'vue-plotly';
import { mapState } from 'vuex';
import { mean, normStdDistributionInv, standardDeviation, defaultRound } from '@math-services';

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
        title: 'Element number'
      },
      yaxis: {
        title: 'x'
      }
      // height: 900
    },
    defaultRound
  }),

  computed: {
    ...mapState([
      'dataset',
      'outliersAlpha'
    ]),

    datasetMean () {
      return mean(this.dataset);
    },

    datasetNormStdInv () {
      return normStdDistributionInv(1 - this.outliersAlpha / 2);
    },

    datasetStandardDeviation () {
      return standardDeviation(this.dataset);
    },

    outliersLowerBound () {
      return this.datasetMean - this.datasetNormStdInv * this.datasetStandardDeviation;
    },

    outliersUpperBound () {
      return this.datasetMean + this.datasetNormStdInv * this.datasetStandardDeviation;
    },

    datasetInRange () {
      const numbersOfSelectedElements = [];

      const numbersInRange = this.dataset.filter((x, index) => {
        if (!this.numberInBoundsPredicate(x)) {
          return false;
        }

        numbersOfSelectedElements.push(index);
        return true;
      });

      return {
        x: numbersOfSelectedElements,
        y: numbersInRange
      };
    },

    datasetOutOfRange () {
      const numbersOfSelectedElements = [];

      const numbersInRange = this.dataset.filter((x, index) => {
        if (this.numberInBoundsPredicate(x)) {
          return false;
        }

        numbersOfSelectedElements.push(index);
        return true;
      });

      return {
        x: numbersOfSelectedElements,
        y: numbersInRange
      };
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
          y: [this.outliersLowerBound, this.outliersLowerBound],
          type: 'scatter',
          mode: 'lines',
          name: 'Lower bound',
          line: { color: 'black' }
        },
        {
          x: [-Number.MAX_VALUE, Number.MAX_VALUE],
          y: [this.outliersUpperBound, this.outliersUpperBound],
          type: 'scatter',
          mode: 'lines',
          name: 'Upper bound',
          line: { color: 'black' }
        }
      ];
    }
  },

  methods: {
    numberInBoundsPredicate (number) {
      return number >= this.outliersLowerBound && number <= this.outliersUpperBound;
    }
  }

};
