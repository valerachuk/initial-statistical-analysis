import { mapState } from 'vuex';
import { defaultRound } from '@math-services';

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

    variationSeriesReadable () {
      return this.variationSeries.map(series => {
        const {
          value,
          relativeFrequency,
          ecdfValue,
          ...rest
        } = series;

        return {
          value: defaultRound(value),
          relativeFrequency: defaultRound(relativeFrequency),
          ecdfValue: defaultRound(ecdfValue),
          ...rest
        };
      });
    },

    frequencySum () {
      const sum = this.variationSeries
        .map(record => record.frequency)
        .reduce((acc, x) => acc + x, 0);
      return defaultRound(sum);
    },

    relativeFrequencySum () {
      const sum = this.variationSeries
        .map(record => record.relativeFrequency)
        .reduce((acc, x) => acc + x, 0);
      return defaultRound(sum);
    }
  }
};
