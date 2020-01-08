import { useEffect, useState } from 'react';
import { Reducer, AnyAction, ActionCreator } from 'redux';
import { useStore } from 'react-redux';

import { AlienStore } from './alien';

export interface ReduxModule<T = {}> {
  id: string;
  reducers: {
    [K: string]: Reducer<T>;
  };
  actions: {
    [K: string]: ActionCreator<AnyAction>;
  };
  selectors?: {
    [K: string]: <S>(state: S) => T;
  };
}

export type AlienResult = Omit<ReduxModule, 'reducers' | 'id'>;

interface AlienModule<T> {
  getModule: () => Promise<ReduxModule<T>>;
  initialActions?: Array<string>;
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

function useAlien<T>(alienModule: AlienModule<T>): AlienResult | null {
  const store = useStore() as AlienStore;
  const {
    alienManager: { injectReducers, rootReducer },
  } = store;
  const [alien, setAlien] = useState<AlienResult | null>(null);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const reduxModule = await alienModule.getModule();

        if (!reduxModule.id) {
          throw new Error('Redux Module has no id');
        }

        const { reducers, actions, selectors } = reduxModule;
        const key = Object.keys(reducers).shift();

        if (key) {
          injectReducers(key, reducers[key]);
          store.replaceReducer(rootReducer);
        }
        setAlien({ actions, selectors });
      } catch (err) {
        setAlien(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return errorHandler(alien);
}

export default useAlien;
