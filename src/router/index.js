import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  VariationSeriesEcdf,
  HistogramKde,
  StatisticalCharacteristics,
  Outliers,
  LaplaceDistributionIdentification
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
  },
  {
    path: '/outliers',
    name: 'Outliers',
    component: Outliers
  },
  {
    path: '/laplace-distribution-identification',
    name: 'LaplaceDistributionIdentification',
    component: LaplaceDistributionIdentification
  }
];

const router = new VueRouter({
  routes
});

export default router;
