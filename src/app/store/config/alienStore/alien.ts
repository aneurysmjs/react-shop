import { createStore as createReduxStore, Store, Reducer } from 'redux';

import manager from './manager';

interface AlienStore extends Store {
  injectReducers: (key: string, reducer: Reducer) => Reducer | void;
}

function alien<R = Reducer, S = undefined>(initialReducer?: R, preloadedState?: S): AlienStore {
  const { rootReducer, injectReducers } = manager(initialReducer);
  const store: AlienStore = createReduxStore(rootReducer, preloadedState);
  store.injectReducers = injectReducers;
  return store;
}

export default alien;
