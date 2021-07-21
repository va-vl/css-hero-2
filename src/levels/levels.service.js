import levelsSource from './levels.json';
import { storage } from '../utils';

const PROGRESS_STORAGE_KEY = 'css-hero-current-progress';

if (!Array.isArray(levelsSource)) {
  throw new TypeError('levels.json must be an array!');
}

/**
 * Retrieves current level progress
 * @returns {Boolean[]} current progress
 */
const getProgress = () => storage.get(PROGRESS_STORAGE_KEY);

/**
 * Sets level progress
 * @param {Boolean[]} progress new progress;
 * @returns {void}
 */
const setProgress = (progress) => {
  storage.set(PROGRESS_STORAGE_KEY, progress);
};

/**
 * @returns {Object[]} levels data
 */
export const getDefaultLevelsData = () => {
  setProgress(new Array(levelsSource.length).fill(false));
  return levelsSource.map((level) => ({ ...level, isSolved: false }));
};

/**
 * Returns an array of levels with their solution status
 * @returns {Object[]} levels data
 */
export const getLevelsData = () => {
  const currentProgress = getProgress();

  if (!currentProgress) {
    return getDefaultLevelsData();
  }

  return levelsSource.map((level, index) => ({
    ...level,
    isSolved: currentProgress[index],
  }));
};

/**
 * Updates levels data
 * @param {number} levelIndex level to update
 * @param {boolean} status level solution status
 * @return {Object[]} levels data
 */
export const updateLevelsData = (levelsData, levelIndex, status = true) => {
  const newProgress = getProgress().map((currentStatus, index) =>
    index === levelIndex ? status : currentStatus
  );
  setProgress(newProgress);

  return levelsData.map((level, index) =>
    index === levelIndex ? { ...level, status } : level
  );
};
