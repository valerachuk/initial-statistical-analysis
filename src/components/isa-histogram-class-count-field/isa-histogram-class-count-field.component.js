import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'IsaHistogramClassCountField',

  data: () => ({
    classCountErrorMessage: ''
  }),

  computed: {
    ...mapState(['variationSeriesClassCount']),
    ...mapGetters(['datasetNoOutliers'])
  },

  methods: {
    ...mapActions(['updateVariationSeriesClassCount', 'calculateVariationSeriesOptimalClassCount']),

    updateClassCount (value) {
      const number = +value;

      if (isFinite(number) &&
        Number.isInteger(number) &&
        number >= 1 &&
        number <= this.datasetNoOutliers.length
      ) {
        this.updateVariationSeriesClassCount(number);
        this.classCountErrorMessage = '';
        return;
      }

      this.classCountErrorMessage = `Class count must be integer in [1, ${this.datasetNoOutliers.length}] range`;
    },

    resetClassCount () {
      this.calculateVariationSeriesOptimalClassCount();
      this.classCountErrorMessage = '';
    }
  }
};
