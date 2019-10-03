/* eslint-disable implicit-arrow-linebreak */
import {
  createStore as createReduxStore,
  combineReducers,
} from 'redux';

import reduceReducers from './reduceReducers';

let store = {};
const reducerMap = {};

const injectReducers = (_reducerMap): void => {
  Object.entries(_reducerMap).forEach(([name, reducer]) => {
    if (!reducerMap[name]) {
      reducerMap[name] = [];
    }
    reducerMap[name].push(reducer);
  });
};

const createRootReducer = () => (
  combineReducers(Object.keys(reducerMap).reduce((result, key) => ({
    ...result,
    [key]: reduceReducers(reducerMap[key]),
  }), {}))
);

const createStore = (...args) => {
  store = createReduxStore(createRootReducer(), ...args);
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
