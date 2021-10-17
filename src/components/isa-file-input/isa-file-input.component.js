import { mapActions } from 'vuex';

export default {
  name: 'IsaFileInput',

  data: () => ({
    fileInputError: ''
  }),

  methods: {
    ...mapActions(['loadDataset']),

    async onFileUploaded (file) {
      const dataToParse = file == null ? null : await file.text();
      const parseSuccess = await this.loadDataset(dataToParse);
      this.fileInputError = parseSuccess ? '' : 'Invalid dataset';
    }
  }
};
