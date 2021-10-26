import Vue from 'vue';
import Vuex from 'vuex';
import {
  calculateVariationSeries,
  parseDataset1D,
  calculateOptimalNumberOfClasses,
  calculateVariationSeriesClasses,
  calculateOptimalBandwidth,
  defaultRound
} from '@math-services';
import outliers from './outliers.store';

Vue.use(Vuex);

export default new Vuex.Store({

  modules: {
    outliers
  },

  state: {
    dataset: null,
    variationSeriesClassCount: null,
    kdeBandwidth: null
  },

  mutations: {
    CLEAR_STATE (state) {
      state.dataset = null;
      state.variationSeriesClassCount = null;
      state.kdeBandwidth = null;
      state.outliersAlpha = null;
      state.hideOutliers = false;
    },

    SET_DATASET (state, newDataset) {
      state.dataset = newDataset;
    },

    SET_VARIATION_SERIES_CLASS_COUNT (state, classCount) {
      state.variationSeriesClassCount = classCount;
    },

    SET_KDE_BANDWIDTH (state, newKdeBandwidth) {
      state.kdeBandwidth = newKdeBandwidth;
    }
  },

  actions: {
    initializeStats ({ dispatch }) {
      dispatch('calculateVariationSeriesOptimalClassCount');
      dispatch('calculateOptimalKdeBandwidth');

      dispatch('outliers/resetOutliersAlphaToDefault');
      dispatch('outliers/setHideOutliers', false);
    },

    loadDataset ({ commit, dispatch }, stringDataset) {
      if (stringDataset == null) {
        commit('CLEAR_STATE');
        return true;
      }

      const dataset = parseDataset1D(stringDataset);
      if (dataset != null) {
        commit('SET_DATASET', dataset);
        dispatch('initializeStats');
        return true;
      }

      commit('CLEAR_STATE');
      return false;
    },

    calculateVariationSeriesOptimalClassCount ({ state, commit }) {
      const classCount = calculateOptimalNumberOfClasses(state.dataset.length);
      commit('SET_VARIATION_SERIES_CLASS_COUNT', classCount);
    },

    updateVariationSeriesClassCount ({ commit }, classCount) {
      commit('SET_VARIATION_SERIES_CLASS_COUNT', classCount);
    },

    calculateOptimalKdeBandwidth ({ state, commit }) {
      const bandwidth = calculateOptimalBandwidth(state.dataset);
      commit('SET_KDE_BANDWIDTH', defaultRound(bandwidth));
    },

    updateKdeBandwidth ({ commit }, bandwidth) {
      commit('SET_KDE_BANDWIDTH', bandwidth);
    }
  },

  getters: {
    isValidDatasetLoaded (state) {
      return state.dataset != null;
    },

    variationSeries (_, getters) {
      return calculateVariationSeries(getters.datasetNoOutliers);
    },

    variationSeriesClasses (state, getters) {
      return calculateVariationSeriesClasses(getters.datasetNoOutliers, state.variationSeriesClassCount);
    },

    datasetNoOutliers (_, getters) {
      return getters['outliers/datasetNoOutliers'];
    }
  }
});
