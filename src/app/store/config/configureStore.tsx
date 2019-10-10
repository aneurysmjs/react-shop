import { createStore } from '~/store/config/dynoStore';

// import throttle from 'lodash.throttle';

import enhancer from '~/store/config/enhancer';

// import { saveState, loadState } from './storage';

// Get the state from localStorage
// const persistedState = loadState();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function configureStore() {
  const store = createStore(enhancer);
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
