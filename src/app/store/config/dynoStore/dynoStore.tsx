import { ComponentType } from 'react';
import {
  createStore as createReduxStore,
  combineReducers,
  Reducer,
  Store,
  StoreEnhancer,
} from 'redux';

import { ReducerMap, StoreShape, INIT_DYNO_STATE } from '~/shared/types';

let store = {} as Store;
let reducerMap: ReducerMap = {
  [INIT_DYNO_STATE]: () => ({}),
};

const createRootReducer = (): Reducer => combineReducers(reducerMap);

export const createStore = (enhancer: StoreEnhancer): Store<StoreShape> => {
  store = createReduxStore(createRootReducer(), enhancer);
  return store;
};

export const reloadStore = (): void => {
  store.replaceReducer(createRootReducer());
  store.dispatch({ type: '@@DYNO_STORE/RELOAD' });
};

export const injectReducers = (newReducers: ReducerMap): void => {
  reducerMap = { ...reducerMap, ...newReducers };
  reloadStore();
};

export async function withStoreModule<P>(
  componentImport: Promise<{ default: ComponentType }>,
  reducerImport: Promise<P>,
): Promise<{ default: ComponentType }> {
  try {
    const module = await componentImport;
    const reducer = await reducerImport;
    injectReducers(reducer);
    return module;
  } catch (error) {
    store.dispatch({ type: '@@DYNO_STORE/ERROR', payload: error });
    throw error;
  }
}

export default {
  createStore,
  reloadStore,
  injectReducers,
  withStoreModule,
};
