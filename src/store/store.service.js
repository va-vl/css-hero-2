import { storage } from '../utils';

const PERSISTENT_STATE_KEY = 'CSS_HERO_2_APP_STATE';

/**
 * Gets state from localStorage
 * @returns {Object | undefined} state
 */
export const getPersistentState = () => {
  const state = storage.get(PERSISTENT_STATE_KEY);

  if (typeof state !== 'object') {
    throw new TypeError('Invalid state in localStorage');
  }

  return state || undefined;
};

/**
 * @param {object} state app state
 */
export const setPersistentState = (state) => {
  const { isAnimated, isCompleted, currentLevelIndex, levels } = state;

  if (isAnimated) {
    return;
  }

  const savedState = {
    isCompleted,
    currentLevelIndex,
    levelProgress: levels.map(({ status }) => status),
  };

  storage.set(PERSISTENT_STATE_KEY, savedState);
};
