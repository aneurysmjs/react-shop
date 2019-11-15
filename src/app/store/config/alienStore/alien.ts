import { createStore as createReduxStore, Store, Reducer } from 'redux';

import manager, { AlienManager } from './manager';

export interface AlienStore extends Store {
  alienManager: AlienManager;
}

function alien<R = Reducer, S = undefined>(initialReducer?: R, preloadedState?: S): AlienStore {
  const alienManager = manager(initialReducer);
  const store: AlienStore = createReduxStore(alienManager.rootReducer, preloadedState);
  store.alienManager = alienManager;
  return store;
}

export default alien;
