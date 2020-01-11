import { useEffect, useState } from 'react';
import { Reducer, AnyAction, ActionCreator } from 'redux';
import { useStore } from 'react-redux';
import { isEmpty, isNil } from 'ramda';

import { AlienStore } from './alien';

export interface ReduxModule<T = {}> {
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

export type AlienResult = Omit<ReduxModule, 'reducers'>;

interface AlienModule<T> {
  id: string;
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useAlien<T>(alienModule: AlienModule<T>, cb: () => void = () => {}): AlienResult | null {
  const store = useStore() as AlienStore;
  const {
    alienManager: { injectReducers, rootReducer },
  } = store;
  const [alien, setAlien] = useState<AlienResult | null>(null);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        if (isNil(alienModule.id) || isEmpty(alienModule.id)) {
          throw new Error('Alien Module has no id');
        }

        const { reducers, actions, selectors } = await alienModule.getModule();

        if (isNil(reducers) || isEmpty(reducers)) {
          throw new Error('Redux Module has no reducers');
        }
        // is safe here to iterate reducers's keys for reducer injection
        Object.keys(reducers).forEach(key => {
          injectReducers(key, reducers[key]);
        });

        store.replaceReducer(rootReducer);

        setAlien({ actions, selectors });
      } catch (err) {
        setAlien(err);
      }
    })();

    return (): void => cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return errorHandler(alien);
}

export default useAlien;
