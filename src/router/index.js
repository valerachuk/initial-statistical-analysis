import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  VariationSeriesEcdf,
  HistogramKde,
  StatisticalCharacteristics
} from '@views';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: 'VariationSeriesEcdf'
    }
  },
  {
    path: '/variation-series-ecdf',
    name: 'VariationSeriesEcdf',
    component: VariationSeriesEcdf
  },
  {
    path: '/histogram-kde',
    name: 'HistogramKde',
    component: HistogramKde
  },
  {
    path: '/statistical-characteristics',
    name: 'StatisticalCharacteristics',
    component: StatisticalCharacteristics
  }
];

const router = new VueRouter({
  routes
});

export default router;
