import {
  ANIMATION_START,
  ANIMATION_STOP,
  LEVEL_SET,
  LEVEL_UPDATE_STATUS,
  SET_IS_COMPLETED,
} from './actions';
import { levels } from '../../levels';

const initialState = {
  isAnimated: false,
  isCompleted: false,
  currentLevelIndex: 0,
  levels: levels.map((level) => ({
    ...level,
    status: 0,
  })),
};

/**
 * @param {object} state
 * @param {object} payload
 */
export const levelReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LEVEL_SET: {
      return {
        ...state,
        isAnimated: false,
        currentLevelIndex: payload,
      };
    }
    case LEVEL_UPDATE_STATUS: {
      const { levelIndex, status } = payload;
      const { levels: storedLevels } = state;
      const level = levels[levelIndex];

      return {
        ...state,
        levels: [
          ...storedLevels.slice(0, levelIndex),
          {
            ...level,
            status: level.status || status,
          },
          ...storedLevels.slice(levelIndex + 1),
        ],
      };
    }
    case ANIMATION_START: {
      return {
        ...state,
        isAnimated: true,
      };
    }
    case ANIMATION_STOP: {
      return {
        ...state,
        isAnimated: false,
      };
    }
    case SET_IS_COMPLETED: {
      return {
        ...state,
        isCompleted: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
