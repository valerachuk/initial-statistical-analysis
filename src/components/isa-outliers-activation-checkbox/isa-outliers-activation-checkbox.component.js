import { mapState, mapActions } from 'vuex';

export default {
  name: 'IsaOutliersActivationCheckbox',

  computed: {
    ...mapState('outliers', ['hideOutliers']),

    hideOutliersCheckbox: {
      get () {
        return this.hideOutliers;
      },
      set (value) {
        this.setHideOutliers(value);
      }
    },

    label () {
      if (this.hideOutliers) {
        return 'Outliers are hidden; to check it, open other tabs';
      }

      return 'Hide outliers';
    }
  },

  methods: {
    ...mapActions('outliers', ['setHideOutliers'])
  }
};
