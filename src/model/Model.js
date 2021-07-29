export class Model {
  constructor(store) {
    this.store = store;
  }

  getCurrentLevel() {
    const { currentLevelIndex, levels } = this.store.getState();
    return {
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
    if (index < 0 || index >= this.store.levels.length) {
      throw new Error('Invalid level index');
    }

    this.dispatchAction({ type: 'LEVEL_SET', payload: index });
  }

  setNextLevel() {
    const { currentLevelIndex } = this.getCurrentLevel();
    this.setLevel(currentLevelIndex + 1);
  }

  setPreviousLevel() {
    const { currentLevelIndex } = this.getCurrentLevel();
    this.setLevel(currentLevelIndex - 1);
  }

  /**
   * @param {Function} cb will be called after state change
   */
  subscribeToStore(cb) {
    this.store.subscribe(cb);
  }
}
