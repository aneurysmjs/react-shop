// @flow strict
import { applyMiddleware, compose } from 'redux';
import type { StoreEnhancer } from 'redux';

import middlewares from '@/store/config/middlewares';

import type { State } from '@/store/types/State';
import type { Actions } from '@/store/types/Actions';

/* eslint-disable */
const devtools =
  typeof window !== 'undefined' &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });
  /* eslint-enable */
// $FlowFixMe
const composeEnhancers: StoreEnhancer<State, Actions> = devtools || compose;

export default composeEnhancers(applyMiddleware(...middlewares));
