import { LEVEL_SET } from './actions';
import { levels } from '../../levels';

const initialState = {
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
        currentLevelIndex: payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
