import { Plotly } from 'vue-plotly';
import { mapGetters } from 'vuex';

export default {
  name: 'IsaEcdfPlot',

  components: {
    Plotly
  },

  data: () => ({
    plotlyLayout: {
      margin: {
        l: 50,
        r: 15,
        b: 50,
        t: 15
      },
      xaxis: {
        title: 'x'
      },
      yaxis: {
        title: 'ECDF (x)'
      }
      // height: 900
    }
  }),

  computed: {
    ...mapGetters(['variationSeries']),

    plotlyData () {
      return [{
        x: this.variationSeries?.map(x => x.value) ?? [],
        y: this.variationSeries?.map(x => x.ecdfValue) ?? [],
        type: 'scatter',
        mode: 'lines+markers',
        line: { shape: 'hv' }
      }];
    }

  }
};
