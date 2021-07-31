import { LEVEL_SET } from './actions';

/**
 * @param {Number} newLevelIndex
 * @returns {object} action
 */
export const levelSetAC = (newLevelIndex) => ({
  type: LEVEL_SET,
  payload: newLevelIndex,
});
