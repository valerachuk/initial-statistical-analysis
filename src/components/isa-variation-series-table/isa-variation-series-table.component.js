import { mapState } from 'vuex';

export default {
  name: 'IsaVariationSeriesTable',

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
    ]
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
