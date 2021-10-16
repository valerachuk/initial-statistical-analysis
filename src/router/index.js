import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: 'VariationSeriesAndECDF'
    }
  },
  {
    path: '/variation-series-ecdf',
    name: 'VariationSeriesAndECDF'
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
