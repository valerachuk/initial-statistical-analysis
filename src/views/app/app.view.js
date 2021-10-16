import IsaFileInput from '../../components/isa-file-input/isa-file-input.component.vue';

export default {
  name: 'App',

  components: {
    IsaFileInput
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
  })
};
