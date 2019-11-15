import { useEffect, useState } from 'react';
import { Reducer } from 'redux';
import { useStore } from 'react-redux';

import { AlienStore } from './alien';

type ModuleChunk<T> = {
  reducers: {
    [K: string]: Reducer<T>;
  };
};

type UseAlienImportType<P> = () => Promise<{
  default: ModuleChunk<P>;
}>;

function errorHandler<T>(errorOrObj: T): T {
  if (errorOrObj && errorOrObj.constructor.name === 'Error') {
    throw new Error(`useAlienModule ${errorOrObj}`);
  }
  return errorOrObj;
}

function useAlien<T>(moduleStore: UseAlienImportType<T>): ModuleChunk<T> | null {
  const store = useStore() as AlienStore;
  const {
    alienManager: { injectReducers, rootReducer },
  } = store;
  const [alienModule, setAlienModule] = useState<ModuleChunk<T> | null>(null);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const module = await moduleStore();
        const { reducers } = module.default;
        const key = Object.keys(reducers).shift();
        if (key) {
          injectReducers(key, reducers[key]);
          store.dispatch({ type: '@@ALIEN_STORE/RELOAD' });
          store.replaceReducer(rootReducer);
        }
        setAlienModule(module.default);
      } catch (err) {
        setAlienModule(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleStore]);

  return errorHandler(alienModule);
}

export default useAlien;
