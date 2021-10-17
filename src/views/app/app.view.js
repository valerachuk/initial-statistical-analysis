import { IsaFileInput, IsaWelcomeCard } from '@components';
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  components: {
    IsaFileInput,
    IsaWelcomeCard
  },

  data: () => ({
    tab: null,
    toolbarTabs: [
      {
        name: 'Variation series & ECDF',
        routeName: 'VariationSeriesEcdf'
      },
      {
        name: 'Histogram & KDE',
        routeName: 'HistogramKde'
      }
    ]
  }),

  computed: {
    ...mapGetters(['isValidDatasetLoaded'])
  }
};
