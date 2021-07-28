import { levels } from '../levels';

const initialState = levels.map((level) => ({
  ...level,
  status: 0,
}));

/**
 * @param {object} state
 * @param {object} action
 */
export const levelReducer = (state = initialState, { type /* , action */ }) => {
  switch (type) {
    default: {
      return {
        ...state,
      };
    }
  }
};
