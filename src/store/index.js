import Vue from 'vue';
import Vuex from 'vuex';
import {
  calculateVariationSeries,
  parseDataset1D,
  calculateOptimalNumberOfClasses,
  calculateVariationSeriesClasses
} from '@math-services';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataset: null,
    variationSeries: null,
    variationSeriesClasses: null,
    variationSeriesClassCount: null
  },

  mutations: {
    CLEAR_STATE (state) {
      state.dataset = null;
      state.variationSeries = null;
      state.variationSeriesClasses = null;
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
    }
  },

  actions: {
    calculateStats ({ dispatch }) {
      dispatch('calculateVariationSeries');
      dispatch('calculateDefaultVariationSeriesClasses');
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
    }

  },

  getters: {
    isValidDatasetLoaded (state) {
      return state.dataset != null;
    }
  }
});
