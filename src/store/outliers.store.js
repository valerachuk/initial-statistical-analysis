import { mean, normStdDistributionInv, standardDeviation } from '@math-services';
import { OUTLIERS_ALPHA_DEFAULT } from '@constants';

export default {
  namespaced: true,

  state: {
    outliersAlpha: null,
    hideOutliers: false
  },

  mutations: {
    SET_OUTLIERS_ALPHA (state, newAlpha) {
      state.outliersAlpha = newAlpha;
    },

    SET_HIDE_OUTLIERS (state, newHideOutliers) {
      state.hideOutliers = newHideOutliers;
    }
  },

  actions: {
    updateOutliersAlpha ({ commit }, newAlpha) {
      commit('SET_OUTLIERS_ALPHA', newAlpha);
    },

    resetOutliersAlphaToDefault ({ commit }) {
      commit('SET_OUTLIERS_ALPHA', OUTLIERS_ALPHA_DEFAULT);
    },

    setHideOutliers ({ commit }, newHideOutliers) {
      commit('SET_HIDE_OUTLIERS', newHideOutliers);
    }
  },

  getters: {
    datasetMean (_, __, rootState) {
      return mean(rootState.dataset);
    },

    datasetNormStdInv (state) {
      return normStdDistributionInv(1 - state.outliersAlpha / 2);
    },

    datasetStandardDeviation (_, __, rootState) {
      return standardDeviation(rootState.dataset);
    },

    lowerBound (_, getters) {
      return getters.datasetMean - getters.datasetNormStdInv * getters.datasetStandardDeviation;
    },

    upperBound (_, getters) {
      return getters.datasetMean + getters.datasetNormStdInv * getters.datasetStandardDeviation;
    },

    numbersInRangeWithIndexes (_, getters, rootState) {
      const indexesOfSelectedElements = [];

      const numbersInRange = rootState.dataset.filter((x, index) => {
        if (!getters.numberInBoundsPredicate(x)) {
          return false;
        }

        indexesOfSelectedElements.push(index);
        return true;
      });

      return {
        indexes: indexesOfSelectedElements,
        numbers: numbersInRange
      };
    },

    numbersOutOfRangeWithIndexes (_, getters, rootState) {
      const indexesOfSelectedElements = [];

      const numbersInRange = rootState.dataset.filter((x, index) => {
        if (getters.numberInBoundsPredicate(x)) {
          return false;
        }

        indexesOfSelectedElements.push(index);
        return true;
      });

      return {
        indexes: indexesOfSelectedElements,
        numbers: numbersInRange
      };
    },

    numberInBoundsPredicate: (_, getters) => number => {
      return number >= getters.lowerBound && number <= getters.upperBound;
    },

    datasetNoOutliers (state, getters, rootState) {
      if (state.hideOutliers) {
        return getters.numbersInRangeWithIndexes.numbers;
      }

      return rootState.dataset;
    }
  }
};
