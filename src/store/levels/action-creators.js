import {
  LEVEL_SET,
  LEVEL_UPDATE_STATUS,
  RESET_PROGRESS,
  ANIMATION_START,
  ANIMATION_STOP,
  SET_IS_COMPLETED,
} from './actions';

const stopAnimationAC = () => ({ type: ANIMATION_STOP });
const levelUpdateStatusAC = (levelIndex, status) => ({
  type: LEVEL_UPDATE_STATUS,
  payload: { levelIndex, status },
});
const setIsCompleted = () => ({ type: SET_IS_COMPLETED });

export const startAnimationAC = () => ({
  type: ANIMATION_START,
});

export const levelSetAC = (newLevelIndex) => ({
  type: LEVEL_SET,
  payload: newLevelIndex,
});

export const levelSolveAC =
  (levelIndex, levelStatus, animationTimeout) => (dispatch, getState) => {
    dispatch(startAnimationAC());

    const { levels, isCompleted } = getState();

    setTimeout(() => {
      dispatch(
        levelIndex < levels.length - 1
          ? levelSetAC(levelIndex + 1)
          : stopAnimationAC()
      );
    }, animationTimeout);

    let notCompletedLevelsIndexes;

    if (!isCompleted) {
      notCompletedLevelsIndexes = levels.reduce((acc, { status }, index) => {
        if (!status) {
          acc.push(index);
        }

        return acc;
      }, []);
    }

    dispatch(levelUpdateStatusAC(levelIndex, levelStatus));

    if (
      !isCompleted &&
      notCompletedLevelsIndexes.length === 1 &&
      notCompletedLevelsIndexes[0] === levelIndex
    ) {
      dispatch(setIsCompleted());
    }
  };

export const resetProgressAC = (levelIndex) => ({
  type: RESET_PROGRESS,
  payload: levelIndex,
});

export const animateAC = (timeout) => (dispatch) => {
  dispatch(startAnimationAC());

  setTimeout(() => {
    dispatch(stopAnimationAC());
  }, timeout);
};
