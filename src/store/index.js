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

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataset: null,
    variationSeries: null,
    variationSeriesClasses: null,
    variationSeriesClassCount: null,
    kdeBandwidth: null
  },

  mutations: {
    CLEAR_STATE (state) {
      state.dataset = null;
      state.variationSeries = null;
      state.variationSeriesClasses = null;
      state.variationSeriesClassCount = null;
      state.kdeBandwidth = null;
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
    }
  },

  actions: {
    calculateStats ({ dispatch }) {
      dispatch('calculateVariationSeries');
      dispatch('calculateDefaultVariationSeriesClasses');
      dispatch('calculateDefaultKdeBandwidth');
    },

    loadDataset ({ commit, dispatch }, stringDataset) {
      if (stringDataset == null) {
        commit('CLEAR_STATE');
        return true;
      }

      const dataset = parseDataset1D(stringDataset);
      if (dataset != null) {
        commit('SET_DATASET', dataset);
        dispatch('calculateStats');
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
      if (bandwidth <= 0) {
        throw new Error('bandwidth must be greater than 0');
      }

      commit('SET_KDE_BANDWIDTH', bandwidth);
    }

  },

  getters: {
    isValidDatasetLoaded (state) {
      return state.dataset != null;
    }
  }
});
