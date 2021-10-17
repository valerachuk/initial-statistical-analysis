import { Plotly } from 'vue-plotly';
import { mapState } from 'vuex';

export default {
  name: 'IsaHistogramKdePlot',

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
        title: 'Relative frequency'
      }
      // height: 900
    }
  }),

  computed: {
    ...mapState(['variationSeriesClasses']),
    histogramToPlotlyScatter () {
      if (this.variationSeriesClasses == null || this.variationSeriesClasses.length === 0) {
        return { x: [], y: [] };
      }

      const y = [0];
      const x = [this.variationSeriesClasses.at(0).lowerBound];

      this.variationSeriesClasses.forEach(({ lowerBound, upperBound, relativeFrequency }) => {
        x.push(lowerBound, upperBound);
        y.push(relativeFrequency, relativeFrequency);
      });

      y.push(0);
      x.push(x.at(-1));

      return { x, y };
    },

    plotlyData () {
      return [{
        ...this.histogramToPlotlyScatter,
        type: 'scatter',
        mode: 'lines+markers',
        fill: 'tozeroy'
      }];
    }

  }
};
