import Vue from 'vue';
import Vuex from 'vuex';
import { parseDataset1D } from '../services/dataset-parser.service';
import { computeVariationSeries } from '../services/variation-series-computer.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataset: null,
    variationSeries: null
  },
  mutations: {
    SET_DATASET (state, newDataset) {
      state.dataset = newDataset;
    },
    CLEAR_DATASET (state) {
      state.dataset = null;
    },

    SET_VARIATION_SERIES (state, newVariationSeries) {
      state.variationSeries = newVariationSeries;
    },
    CLEAR_VARIATION_SERIES (state) {
      state.variationSeries = null;
    }
  },
  actions: {
    clearAllData ({ commit }) {
      commit('CLEAR_DATASET');
      commit('CLEAR_VARIATION_SERIES');
    },

    computeStats ({ state, commit }) {
      const variationSeries = computeVariationSeries(state.dataset);
      commit('SET_VARIATION_SERIES', variationSeries);
    },

    loadDataset ({ commit, dispatch }, stringDataset) {
      if (stringDataset == null) {
        dispatch('clearAllData');
        return true;
      }

      const dataset = parseDataset1D(stringDataset);
      if (dataset != null) {
        commit('SET_DATASET', dataset);
        dispatch('computeStats');
        return true;
      }

      dispatch('clearAllData');
      return false;
    }
  },
  getters: {
    isValidDatasetLoaded (state) {
      return state.dataset != null;
    }
  }
});
