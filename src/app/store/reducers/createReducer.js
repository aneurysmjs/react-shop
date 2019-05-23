// @flow strict

import type { Action, Reducer } from 'redux';

type HandlersType<S, A> = {
  [string]: Reducer<S, A>
};

function createReducer<S, A: Action<string>>(
  initialState: S,
  handlers: HandlersType<S, A>
): (state: S, action: A) => S {
  return function reducer(state = initialState, action: A) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export default createReducer;
