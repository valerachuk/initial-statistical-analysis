import { mapState, mapActions } from 'vuex';

export default {
  name: 'IsaHistogramClassCountField',

  data: () => ({
    classCountErrorMessage: ''
  }),

  computed: {
    ...mapState(['variationSeriesClassCount', 'variationSeries'])
  },

  methods: {
    ...mapActions(['updateVariationSeriesClassCount', 'calculateDefaultVariationSeriesClasses']),

    updateClassCount (value) {
      const number = +value;

      if (isFinite(number) &&
        Number.isInteger(number) &&
        number >= 1 &&
        number <= this.variationSeries.length
      ) {
        this.updateVariationSeriesClassCount(number);
        this.classCountErrorMessage = '';
        return;
      }

      this.classCountErrorMessage = `Class count must be integer in [1, ${this.variationSeries.length}] range`;
    },

    resetClassCount () {
      this.calculateDefaultVariationSeriesClasses();
      this.classCountErrorMessage = '';
    }
  }
};
