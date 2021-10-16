export default {
  data: () => ({
    tab: null,
    toolbarTabs: [
      {
        name: 'Variation series & ECDF',
        routeName: 'VariationSeriesAndECDF'
      },
      {
        name: 'bbb',
        routeName: 'b'
      }
    ]
  }),

  methods: {
    async onFileUploaded (file) {
      if (file == null) {
        console.log('null');
        return;
      }

      const text = await file.text();
      console.log(text);
    }
  }
};
