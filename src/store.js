/**
 * @module store
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import { saveState, loadState } from './localStorage';

import reducer from './reducers';
// Get the state from localStorage
const persistedState = loadState();
// when the extension is not installed, we’re using Redux compose here.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

// Save the state any time the store state changes
store.subscribe(throttle(() => {
  // Rather than pass the whole state object, just pass an object with the key field from the state object.
  saveState({
    movie: store.getState().movie,
  });
}, 1000));

export default store;
