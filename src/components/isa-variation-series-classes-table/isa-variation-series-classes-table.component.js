import { mapGetters } from 'vuex';
import { defaultRound, sum } from '@math-services';

export default {
  name: 'IsaVariationSeriesClassesTable',

  data: () => ({
    variationSeriesClassesHeaders: [
      {
        text: 'Class number',
        value: 'classNumber',
        sortable: false
      },
      {
        text: 'Range',
        value: 'range',
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
    ...mapGetters(['variationSeriesClasses']),

    variationSeriesClassesReadable () {
      return this.variationSeriesClasses.map((variationClass, index) => {
        const {
          lowerBound,
          upperBound,
          relativeFrequency,
          ecdfValue,
          ...rest
        } = variationClass;

        const isLast = index === this.variationSeriesClasses.length - 1;

        return {
          ...rest,
          relativeFrequency: defaultRound(relativeFrequency),
          ecdfValue: defaultRound(ecdfValue),
          range: `[${defaultRound(lowerBound)}; ${defaultRound(upperBound)}${isLast ? ']' : ')'}`
        };
      });
    },

    frequencySum () {
      const frequencies = this.variationSeriesClasses
        .map(record => record.frequency);
      return defaultRound(sum(frequencies));
    },

    relativeFrequencySum () {
      const relativeFrequencies = this.variationSeriesClasses
        .map(record => record.relativeFrequency);
      return defaultRound(sum(relativeFrequencies));
    }
  }
};
