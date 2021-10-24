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
import { OUTLIERS_ALPHA_DEFAULT } from '@constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataset: null,
    variationSeries: null,
    variationSeriesClasses: null,
    variationSeriesClassCount: null,
    kdeBandwidth: null,
    outliersAlpha: null,
    hideOutliers: false
  },

  mutations: {
    CLEAR_STATE (state) {
      state.dataset = null;
      state.variationSeries = null;
      state.variationSeriesClasses = null;
      state.variationSeriesClassCount = null;
      state.kdeBandwidth = null;

      state.outliersAlpha = null;
      state.hideOutliers = false;
    },

    SET_DATASET (state, newDataset) {
      state.dataset = newDataset;
    },

    SET_VARIATION_SERIES (state, newVariationSeries) {
      state.variationSeries = newVariationSeries;
    },

    SET_VARIATION_SERIES_CLASSES_AND_COUNT (state, payload) {
      state.variationSeriesClasses = payload.variationSeriesClasses;
      state.variationSeriesClassCount = payload.classCount;
    },

    SET_KDE_BANDWIDTH (state, newKdeBandwidth) {
      state.kdeBandwidth = newKdeBandwidth;
    },

    SET_OUTLIERS_ALPHA (state, newAlpha) {
      state.outliersAlpha = newAlpha;
    },

    SET_HIDE_OUTLIERS (state, newHideOutliers) {
      state.hideOutliers = newHideOutliers;
    }
  },

  actions: {
    computeNonOutliersStats ({ dispatch }) {
      dispatch('calculateVariationSeries');
      dispatch('calculateDefaultVariationSeriesClasses');
      dispatch('calculateDefaultKdeBandwidth');
    },

    initializeStats ({ dispatch }) {
      dispatch('computeNonOutliersStats');

      dispatch('resetOutliersAlphaToDefault');
      dispatch('setHideOutliers', false);
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

    calculateVariationSeries ({ state, commit }) {
      const variationSeries = calculateVariationSeries(state.dataset);
      commit('SET_VARIATION_SERIES', variationSeries);
    },

    calculateDefaultVariationSeriesClasses ({ state, commit }) {
      const classCount = calculateOptimalNumberOfClasses(state.dataset.length);
      const variationSeriesClasses = calculateVariationSeriesClasses(state.dataset, classCount);
      commit('SET_VARIATION_SERIES_CLASSES_AND_COUNT', { variationSeriesClasses, classCount });
    },

    updateVariationSeriesClassCount ({ state, commit }, classCount) {
      if (classCount < 1) {
        throw new Error('classCount must not be less than 1');
      }

      const variationSeriesClasses = calculateVariationSeriesClasses(state.dataset, classCount);
      commit('SET_VARIATION_SERIES_CLASSES_AND_COUNT', { variationSeriesClasses, classCount });
    },

    calculateDefaultKdeBandwidth ({ state, commit }) {
      const bandwidth = calculateOptimalBandwidth(state.dataset);
      commit('SET_KDE_BANDWIDTH', defaultRound(bandwidth));
    },

    updateKdeBandwidth ({ commit }, bandwidth) {
      commit('SET_KDE_BANDWIDTH', bandwidth);
    },

    resetOutliersAlphaToDefault ({ commit }) {
      commit('SET_OUTLIERS_ALPHA', OUTLIERS_ALPHA_DEFAULT);
    },

    updateOutliersAlpha ({ commit }, newAlpha) {
      commit('SET_OUTLIERS_ALPHA', newAlpha);
    },

    setHideOutliers ({ commit, dispatch }, newHideOutliers) {
      commit('SET_HIDE_OUTLIERS', newHideOutliers);
      dispatch('computeNonOutliersStats');
    }
  },

  getters: {
    isValidDatasetLoaded (state) {
      return state.dataset != null;
    }
  }
});
