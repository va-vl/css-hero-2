import { levelActionCreators } from '../store';

export class Model {
  constructor(store) {
    this.store = store;
  }

  getLevelData() {
    const { currentLevelIndex, levels } = this.store.getState();
    return {
      levels,
      currentLevelIndex,
      currentLevel: levels[currentLevelIndex],
    };
  }

  dispatchAction(action) {
    this.store.dispatch(action);
  }

  /**
   * @param {Number} index
   */
  setLevel(index) {
    const { length: levelsAmount } = this.store.getState().levels;

    if (index < 0 || index >= levelsAmount) {
      throw new Error('Invalid level index');
    }

    this.dispatchAction(levelActionCreators.levelSetAC(index));
  }

  /**
   * @param {Function} cb will be called after state change
   */
  subscribe(cb) {
    this.store.subscribe(cb);
  }
}
