import { createStore as createReduxStore, combineReducers, Reducer } from 'redux';

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

const createRootReducer = (): Reducer =>
  combineReducers(
    Object.keys(reducerMap).reduce(
      (result, key) => ({
        ...result,
        [key]: reduceReducers(reducerMap[key]),
      }),
      {},
    ),
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

type WithReloadStoreType = <P>(dynamicImport: Promise<P>) => Promise<P>;

export const withReloadStore: WithReloadStoreType = dynamicImport =>
  dynamicImport
    .then(module => {
      dynoStore.reloadStore();
      return module;
    })
    .catch((error: Error) => {
      throw error;
    });

export default dynoStore;
