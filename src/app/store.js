/**
 * @module store
 */

import { createStore, applyMiddleware, compose } from 'redux';
import throttle from 'lodash/throttle';

import { saveState, loadState } from './localStorage';
// Middleware is the suggested way to extend Redux with custom functionality.
import middlewares from './middlewares';
// import all reducers
import reducer from './reducers';
// Get the state from localStorage
const persistedState = loadState();
const devtools =
  typeof window !== 'undefined' &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
  // when the extension is not installed, we’re using Redux compose here.
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });

const composeEnhancers = devtools || compose;

const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(...middlewares)) // the third parameter is what is called an 'enhancer'
);

// Save the state any time the store state changes
store.subscribe(throttle(() => {
  // Rather than pass the whole state object, just pass an object with the key field from the state object.
  saveState({
    movie: store.getState().movie,
  });
}, 1000));

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers').default)
    );
  }
}

export default store;
