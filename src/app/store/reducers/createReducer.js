// @flow strict

import type { ActionType } from '@/store/actions/makeActionCreator';

type HandlersType = {
  [string]: <T>(state: T, ActionType) => T
};

function createReducer<T>(initialState: T, handlers: HandlersType)  {
  return function reducer(state: T = initialState, action: ActionType): T {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export default createReducer;
