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
        routeName: 'VariationSeriesAndEcdf'
      },
      {
        name: 'bbb',
        routeName: 'b'
      }
    ]
  }),

  computed: {
    ...mapGetters(['isValidDatasetLoaded'])
  }
};
