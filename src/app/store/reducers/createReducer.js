// @flow strict

import type { ActionType } from '@/store/actions/makeActionCreator';

type HandlersType = {
  [string]: <S>(state: S, ActionType) => S
};

function createReducer<S>(initialState: S, handlers: HandlersType)  {
  return function reducer(state: S = initialState, action: ActionType): S {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export default createReducer;
