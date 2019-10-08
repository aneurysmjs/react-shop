import { AnyAction, Reducer } from 'redux';

type HandlersType<S, A extends AnyAction> = {
  [key: string]: Reducer<S, A>;
};

const has = Object.prototype.hasOwnProperty;

function createReducer<S, A extends AnyAction>(initialState: S, handlers: HandlersType<S, A>) {
  return function reducer(state = initialState, action: A): S {
    if (has.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

export default createReducer;
