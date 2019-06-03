// @flow strict
import { createStore, applyMiddleware, compose } from 'redux';
import type { Dispatch, StoreEnhancer } from 'redux';

import type { State } from '@/store/types/State';
import type { Actions } from '@/store/types/Actions';

// import throttle from 'lodash.throttle';

// Middleware is the suggested way to extend Redux with custom functionality.
import middlewares from '@/store/middlewares';

// import all reducers
import reducer from '@/store/reducers';

// import { saveState, loadState } from './localStorage';

// Get the state from localStorage
//const persistedState = loadState();

const devtools =
  typeof window !== 'undefined' &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
  // when the extension is not installed, we’re using Redux compose here.
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });
// $FlowFixMe
const composeEnhancers: StoreEnhancer<State, Actions, Dispatch<Actions>> = devtools || compose;

function configureStore() {
  
  const store = createStore<{}, Actions, Dispatch<Actions>>(
    reducer,
    // persistedState,
    composeEnhancers(applyMiddleware(...middlewares)) // the third parameter is what is called an 'enhancer'
  );
  
  /* // Save the state any time the store state changes
  store.subscribe(throttle(() => {
    // Rather than pass the whole state object, just pass an object with the key field from the state object.
    saveState({
      product: store.getState().product,
    });
  }, 1000)); */

  return store;
}

export default configureStore;
