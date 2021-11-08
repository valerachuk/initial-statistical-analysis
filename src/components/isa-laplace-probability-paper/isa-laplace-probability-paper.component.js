import { Plotly } from 'vue-plotly';
import { mapGetters } from 'vuex';
import { createEcdfToProbabilityPaper } from '@math-services';

export default {
  name: 'IsaLaplaceProbabilityPaper',

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
        title: 't'
      },
      yaxis: {
        title: 'z'
      }
      // height: 900
    }
  }),

  computed: {
    ...mapGetters(['variationSeries', 'datasetNoOutliers']),

    variationSeriesToProbabilityPaper () {
      const variationSeriesCopy = this.variationSeries.concat();
      variationSeriesCopy.pop();

      const ecdfToProbabilityPaper = createEcdfToProbabilityPaper(this.datasetNoOutliers);
      return {
        x: variationSeriesCopy.map(x => x.value),
        y: variationSeriesCopy.map(x => ecdfToProbabilityPaper(x.value, x.ecdfValue))
      };
    },

    plotlyData () {
      return [{
        ...this.variationSeriesToProbabilityPaper,
        type: 'scatter',
        mode: 'markers',
        name: 'ECDF'
      }];
    }

  }
};
