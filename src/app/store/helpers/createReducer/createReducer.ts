/* eslint-disable @typescript-eslint/ban-ts-ignore, @typescript-eslint/no-unused-vars */
import { Reducer } from 'redux';

type HandlersType<S, A> = {
  // @ts-ignore
  [key: string]: Reducer<S, A>;
};

const has = Object.prototype.hasOwnProperty;

function createReducer<S, A>(initialState: S, handlers: HandlersType<S, A>) {
  return function reducer(state = initialState, action: A): S {
    // @ts-ignore
    if (has.call(handlers, action.type)) {
      // @ts-ignore
      return handlers[action.type](state, action);
    }
    return state;
  };
}

export default createReducer;
