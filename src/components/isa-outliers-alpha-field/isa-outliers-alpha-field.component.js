import { mapState } from 'vuex';
import { mapActions } from 'vuex/dist/vuex.common.js';

export default {
  name: 'IsaOutliersAlphaField',

  data: () => ({
    outliersAlphaErrorMessage: ''
  }),

  computed: {
    ...mapState(['outliersAlpha', 'hideOutliers'])
  },

  methods: {
    ...mapActions(['updateOutliersAlpha', 'resetOutliersAlphaToDefault']),

    validateAndUpdateOutliersAlpha (newAlpha) {
      const alphaNumber = +newAlpha;

      if (isFinite(alphaNumber) &&
        alphaNumber > 0 &&
        alphaNumber <= 1
      ) {
        this.updateOutliersAlpha(alphaNumber);
        this.outliersAlphaErrorMessage = '';
        return;
      }

      this.outliersAlphaErrorMessage = 'α must be in (0, 1] range';
    },

    resetAlpha () {
      this.resetOutliersAlphaToDefault();
      this.outliersAlphaErrorMessage = '';
    }
  }
};
