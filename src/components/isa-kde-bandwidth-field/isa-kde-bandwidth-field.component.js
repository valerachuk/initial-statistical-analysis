import { mapState, mapActions } from 'vuex';

export default {
  name: 'IsaKdeBandwidthField',

  data: () => ({
    kdeBandwidthErrorMessage: ''
  }),

  computed: {
    ...mapState(['kdeBandwidth'])
  },

  methods: {
    ...mapActions(['updateKdeBandwidth', 'calculateOptimalKdeBandwidth']),

    updateBandwidth (value) {
      const number = +value;

      if (isFinite(number) && number > 0) {
        this.updateKdeBandwidth(number);
        this.kdeBandwidthErrorMessage = '';
        return;
      }

      this.kdeBandwidthErrorMessage = 'Bandwidth must be greater than 0';
    },

    resetKdeBandwidth () {
      this.calculateOptimalKdeBandwidth();
      this.kdeBandwidthErrorMessage = '';
    }
  }

};
