// @flow strict

import type { Action, Reducer } from 'redux';

type HandlersType<S, A> = {
  [key: string]: Reducer<S, A>
};

const has = Object.prototype.hasOwnProperty;

function createReducer<S, A: Action<string>>(
  initialState: S,
  handlers: HandlersType<S, A>,
): Reducer<S, A> {
  return function reducer(state = initialState, action: A) {
    if (has.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

export default createReducer;
