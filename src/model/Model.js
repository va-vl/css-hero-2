import { levelActionCreators } from '../store';

export class Model {
  constructor(store) {
    this.store = store;
    this.snapshot = null;
  }

  getData() {
    const { currentLevelIndex, levels } = this.store.getState();
    return {
      levels,
      currentLevelIndex,
      currentLevel: levels[currentLevelIndex],
    };
  }

  saveSnapshot() {
    this.snapshot = JSON.stringify(this.store.getState());
  }

  isAnimationOn() {
    return this.store.getState().isAnimated;
  }

  isGameCompleted() {
    if (this.snapshot === null) {
      return false;
    }

    const wasCompleted = JSON.parse(this.snapshot).isCompleted;
    const { isCompleted } = this.store.getState();
    return !wasCompleted && isCompleted;
  }

  /**
   * @param {Number} index
   */
  setLevel(index) {
    const { length: levelsAmount } = this.store.getState().levels;

    if (index < 0 || index >= levelsAmount) {
      throw new Error('Invalid level index');
    }

    this.store.dispatch(levelActionCreators.levelSetAC(index));
  }

  /**
   * @param {Number} index
   * @param {Number} status
   * @param {Number} timeout
   */
  setLevelSolved(index, status, timeout) {
    this.store.dispatch(
      levelActionCreators.levelSolveAC(index, status, timeout)
    );
  }

  /**
   * @param {Number} levelIndex
   */
  resetProgress(levelIndex) {
    this.store.dispatch(levelActionCreators.resetProgressAC(levelIndex));
  }

  startAnimation() {
    this.store.dispatch(levelActionCreators.startAnimationAC());
  }

  /**
   * @param {Number} timeout
   */
  setAnimation(timeout) {
    this.store.dispatch(levelActionCreators.animateAC(timeout));
  }

  /**
   * @param {Function} cb will be called after state change
   */
  subscribe(cb) {
    this.store.subscribe(cb);
  }
}
