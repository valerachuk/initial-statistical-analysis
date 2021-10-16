import { mapState } from 'vuex';
import { Plotly } from 'vue-plotly';

export default {
  name: 'VariationSeriesEcdf',

  components: {
    Plotly
  },

  data: () => ({
    variationSeriesHeaders: [
      {
        text: 'Series number',
        value: 'seriesNumber',
        sortable: false
      },
      {
        text: 'Value',
        value: 'value',
        sortable: false
      },
      {
        text: 'Frequency',
        value: 'frequency',
        sortable: false
      },
      {
        text: 'Relative frequency',
        value: 'relativeFrequency',
        sortable: false
      },
      {
        text: 'ECDF',
        value: 'ecdfValue',
        sortable: false
      }
    ],

    data: [{
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: 'scatter'
    }],
    layout: {
      title: 'My graph'
    }
  }),

  computed: {
    ...mapState(['variationSeries']),

    frequencySum () {
      if (this.variationSeries == null) {
        return;
      }

      return this.variationSeries
        .map(record => record.frequency)
        .reduce((acc, x) => acc + x, 0);
    },

    relativeFrequencySum () {
      if (this.variationSeries == null) {
        return;
      }

      return this.variationSeries
        .map(record => record.relativeFrequency)
        .reduce((acc, x) => acc + x, 0);
    }

  }

};
