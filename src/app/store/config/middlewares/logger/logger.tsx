/* eslint-disable */

import { Middleware, AnyAction } from 'redux';

import { State } from '~/store/State';

/* eslint-disable no-console */
/**
 * Taken from: https://github.com/gaearon/todos/blob/17-the-middleware-chain/src/configureStore.js
 *
 * Logs debugging information
 *
 * @param {Object} store - Redux's store
 * @return {Function}
 */
// eslint-disable-next-line arrow-body-style
const logger: Middleware<State, AnyAction> = (store) => {
  /**
   * Rather than take the next middleware from the store, we'll
   * make it injectable as an argument, so the function that calls
   * the middlewares can chose which middleware to pass
   */
  return (next) => {
    if (!console.group) {
      return next;
    }
    // The actual dispatch function
    return (action) => {
      console.group(action.type);
      console.log('%c prev state', 'color: gray', store.getState());
      console.log('%c action', 'color: blue', action);
      const returnValue = next(action);
      console.log('%c next state', 'color: green', store.getState());
      
      console.groupEnd(action.type);
      return returnValue;
    };
  };
};

export default logger;
