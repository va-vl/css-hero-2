/**
 *
 * @param {Object} store the store object
 * @property {Function} store.dispatch action-dispatching function
 * @property {Function} store.getState
 * @returns {Function}
 */
export const MyThunk =
  ({ dispatch, getState }) =>
  /**
   * Function that will be called later
   * @param {Function} next core action dispatch
   * @returns {Function}
   */
  (next) =>
  /**
   * @param {Object} action action object
   */
  (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
