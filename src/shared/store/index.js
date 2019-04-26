/**
 * @module store
 */

import configureStore from './configureStore';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('store/reducers', () =>
      store.replaceReducer(require('store/reducers').default)
    );
  }
}

export default store;
