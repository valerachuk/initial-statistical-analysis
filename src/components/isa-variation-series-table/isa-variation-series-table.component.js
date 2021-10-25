import { mapGetters } from 'vuex';
import { defaultRound, sum } from '@math-services';

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
    ...mapGetters(['variationSeries']),

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
      const frequencies = this.variationSeries
        .map(record => record.frequency);
      return defaultRound(sum(frequencies));
    },

    relativeFrequencySum () {
      const relativeFrequencies = this.variationSeries
        .map(record => record.relativeFrequency);
      return defaultRound(sum(relativeFrequencies));
    }
  }
};
