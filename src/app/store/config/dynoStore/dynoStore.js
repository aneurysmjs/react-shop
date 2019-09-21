/* eslint-disable implicit-arrow-linebreak */
// @flow strict
import {
  createStore as createReduxStore,
  combineReducers,
} from 'redux';
import type { Dispatch } from 'redux';

// import type { State } from '@/store/types/State';
import type { Actions } from '@/store/types/Actions';

import reduceReducers from './reduceReducers';

let store = {};
const reducerMap = {};

// $FlowFixMe
const injectReducers = (_reducerMap): void => {
  Object.entries(_reducerMap).forEach(([name, reducer]) => {
    if (!reducerMap[name]) {
      reducerMap[name] = [];
    }
    reducerMap[name].push(reducer);
  });
};

const createRootReducer = () => (
  // $FlowFixMe
  combineReducers(Object.keys(reducerMap).reduce((result, key) => ({
    ...result,
    [key]: reduceReducers(reducerMap[key]),
  }), {}))
);

// $FlowFixMe
const createStore = (...args) => {
  store = createReduxStore<{}, Actions, Dispatch<Actions>>(createRootReducer(), ...args);
  return store;
};

const reloadStore = (): void => {
  store.replaceReducer(createRootReducer());
  // store.dispatch({ type: '@@replace-reducer' });
};

export const dynoStore = {
  injectReducers,
  createRootReducer,
  createStore,
  reloadStore,
};

export const withReloadStore = (importPromise: *): Promise<*> => (
  importPromise
    .then((module) => {
      dynoStore.reloadStore();
      return module;
    },
    (error) => {
      throw error;
    })
);

export default dynoStore;
