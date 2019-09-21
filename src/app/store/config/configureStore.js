// @flow strict
import { createStore } from 'redux';
import type { Dispatch } from 'redux';

import type { Actions } from '@/store/types/Actions';

// import throttle from 'lodash.throttle';

// import all reducers
import reducer from '@/store/reducers';

import enhancer from '@/store/config/enhancer';

// import { saveState, loadState } from './storage';

// Get the state from localStorage
// const persistedState = loadState();

function configureStore() {
  const store = createStore<{}, Actions, Dispatch<Actions>>(
    reducer,
    // persistedState,
    enhancer, // third parameter is called an 'enhancer'
  );
  /* // Save the state any time the store state changes
  store.subscribe(throttle(() => {
    // Rather than pass the whole state object,
    // just pass an object with the key field from the state object.
    saveState({
      product: store.getState().product,
    });
  }, 1000)); */

  return store;
}

export default configureStore;
