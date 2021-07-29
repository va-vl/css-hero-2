/**
 * @typedef {object} Action redux action object
 * @property {string} type action type
 * @property {any} payload action payload
 */

/**
 * Throw error if action is invalid
 * @param {Action} action
 * @returns {never}
 */
const validateAction = (action) => {
  if (!action || typeof action !== 'object' || Array.isArray(action)) {
    throw new TypeError('Action must be an object!');
  }

  if (typeof action.type !== 'string') {
    throw new Error('Action type must be a string!');
  }
};

/**
 * Takes a list of middlewares and returns one "combined" middleware
 * @param  {...Function} middleware a list of middlewares
 * @returns {Function}
 */
export const applyMiddleware =
  (...middleware) =>
  /**
   * @param {Object} store
   */
  (store) => {
    switch (middleware.length) {
      case 0:
        return (dispatch) => dispatch;
      case 1:
        return middleware[0](store);
      default: {
        return middleware
          .map((mw) => mw(store))
          .reduce(
            (acc, boundMiddleware) => (next) => acc(boundMiddleware(next))
          );
      }
    }
  };

/**
 * @param {object} arg - store options
 * @param {Function} arg.reducer
 * @param {Function} arg.middleware
 * @param {Function} arg.preloader preload state
 * @returns {object} store
 */
export const createStore = ({ reducer, middleware, preloader = undefined }) => {
  let state = preloader && preloader();
  let subscribers = [];

  /**
   * @param {Action} action
   */
  const coreDispatch = (action) => {
    validateAction(action);
    state = reducer(state, action);
    subscribers.forEach((cb) => cb());
  };

  const getState = () => state;

  const store = {
    dispatch: coreDispatch,
    getState,

    subscribe: (cb) => {
      subscribers.push(cb);
      return () => {
        subscribers = subscribers.filter((subscribedCb) => subscribedCb !== cb);
      };
    },
  };

  if (middleware) {
    /**
     * @param {Action} action
     */
    const dispatch = (action) => store.dispatch(action);

    store.dispatch = middleware({
      dispatch,
      getState,
    })(coreDispatch);
  }

  coreDispatch({ type: '@@redux/INIT' });

  return store;
};
