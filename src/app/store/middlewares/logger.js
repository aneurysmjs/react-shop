// @flow strict

import type { Dispatch, Middleware } from 'redux';

import type { State } from '@/store/types/State';
import type { Actions, MiddlewareAction } from '@/store/types/Actions';

/* eslint-disable no-console */
/**
 * Taken from: https://github.com/gaearon/todos/blob/17-the-middleware-chain/src/configureStore.js
 *
 * Logs debugging information
 *
 * @param {Object} store - Redux's store
 * @return {Function}
 */
const logger: Middleware<State, Actions, Dispatch<MiddlewareAction<State>>> = (store) => {
  
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
      // $FlowIgnore
      console.groupEnd(action.type);
      return returnValue;
    };

  };

};

export default logger;
