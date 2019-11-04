import { ComponentType, useEffect, useState } from 'react';
import {
  createStore as createReduxStore,
  combineReducers,
  Reducer,
  Store,
  StoreEnhancer,
} from 'redux';

import { ReducerMap, StoreShape } from '~/shared/types';

let store = {} as Store;

const alienReducer = {
  defaultState: (): string => 'default state value',
};

let reducerMap = {};

const createRootReducer = (): Reducer => {
  return combineReducers(reducerMap);
};

export const createStore = (
  initialReducers = alienReducer,
  enhancer?: StoreEnhancer,
): Store<StoreShape> => {
  reducerMap = { ...initialReducers };

  store = createReduxStore(createRootReducer(), enhancer);
  return store;
};

export const getReducerMap = (): typeof reducerMap => reducerMap;

export const reloadStore = (): void => {
  store.replaceReducer(createRootReducer());
  if (process.env.NODE_ENV !== 'production') {
    store.dispatch({ type: '@@ALIEN_STORE/RELOAD' });
  }
};

export const injectReducers = (newReducers: ReducerMap): void => {
  const key = Object.keys(newReducers).shift();

  // if the reducer already exist, just skip
  if (key && reducerMap[key]) {
    return;
  }

  reducerMap = { ...reducerMap, ...newReducers };

  reloadStore();
};

export const removeReducers = (key: string): void => {
  // if the reducer doens't exist, just skip
  if (key && !reducerMap[key]) {
    return;
  }

  delete reducerMap[key];

  if (Object.keys(reducerMap).length === 0) {
    throw new Error('alienStore: the reducerMap cannot be empty, otherwise Redux will complaint');
  }

  reloadStore();
};

export async function withStoreModule<P>(
  componentImport: Promise<{ default: ComponentType }>,
  reducerImport: Promise<P>,
): Promise<{ default: ComponentType }> {
  try {
    const [module, reducer] = await Promise.all([componentImport, reducerImport]);
    injectReducers(reducer);
    return module;
  } catch (error) {
    store.dispatch({ type: '@@ALIEN_STORE/ERROR', payload: error.message });
    throw error;
  }
}

type UseAlienModuleImportType<P> = () => Promise<{ default: P } | P>;

function errorHandler<P>(errorOrObj: P): P {
  if (errorOrObj && errorOrObj.constructor.name === 'Error') {
    throw new Error(`useAlienModule ${errorOrObj}`);
  }
  return errorOrObj;
}

export function useAlienModule<P>(moduleStore: UseAlienModuleImportType<P>): P | null {
  const [alienModule, setAlienModule] = useState<P | null>(null);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const module = await moduleStore();
        const reducerToInject = module.reducers ? module.reducers : module;
        injectReducers(reducerToInject);
        setAlienModule(module);
      } catch (err) {
        setAlienModule(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleStore]);

  return errorHandler(alienModule);
}

export default {
  createStore,
  getReducerMap,
  injectReducers,
  reloadStore,
  removeReducers,
  useAlienModule,
  withStoreModule,
};
