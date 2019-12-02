import { useEffect, useState } from 'react';
import { Reducer } from 'redux';
import { useStore } from 'react-redux';

import { AlienStore } from './alien';

type AlienModule<T> = {
  reducers: {
    [K: string]: Reducer<T>;
  };
};

interface ImportAlienModule<P> {
  (): Promise<AlienModule<P>>;
}

function errorHandler<T>(errorOrObj: T): T {
  if (errorOrObj) {
    // rejection from `import()` for some reason is not and instance of Error
    // that's why the "Object.getPrototypeOf(errorOrObj).name"
    if (errorOrObj instanceof Error || Object.getPrototypeOf(errorOrObj).name === 'Error') {
      throw new Error(`useAlienModule ${errorOrObj}`);
    }
  }
  return errorOrObj;
}

function useAlien<T>(moduleStore: ImportAlienModule<T>): AlienModule<T> | null {
  const store = useStore() as AlienStore;
  const {
    alienManager: { injectReducers, rootReducer },
  } = store;
  const [alienModule, setAlienModule] = useState<AlienModule<T> | null>(null);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const module = await moduleStore();
        const { reducers } = module;
        const key = Object.keys(reducers).shift();
        if (key) {
          injectReducers(key, reducers[key]);
          store.replaceReducer(rootReducer);
        }
        setAlienModule(module);
      } catch (err) {
        setAlienModule(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleStore]);

  return errorHandler(alienModule);
}

export default useAlien;
