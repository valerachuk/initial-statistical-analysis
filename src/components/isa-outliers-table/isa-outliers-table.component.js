import { mapGetters } from 'vuex';

export default {
  name: 'IsaOutliersTable',

  data: () => ({
    outliersHeaders: [
      {
        text: 'Index',
        value: 'index',
        sortable: false
      },
      {
        text: 'Value',
        value: 'value',
        sortable: false
      }
    ]
  }),

  computed: {
    ...mapGetters('outliers', ['numbersOutOfRangeWithIndexes']),

    outliersWithIndexes () {
      const outliersIndexes = [];

      const { indexes, numbers } = this.numbersOutOfRangeWithIndexes;

      numbers.forEach((number, i) => {
        outliersIndexes.push({
          index: indexes[i],
          value: number
        });
      });

      return outliersIndexes;
    }
  }
};
