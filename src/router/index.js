import Vue from 'vue';
import VueRouter from 'vue-router';
import { VariationSeriesEcdf } from '@views';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: 'VariationSeriesAndEcdf'
    }
  },
  {
    path: '/variation-series-ecdf',
    name: 'VariationSeriesAndEcdf',
    component: VariationSeriesEcdf
  },
  {
    path: '/b',
    name: 'b'
  }
];

const router = new VueRouter({
  routes
});

export default router;
