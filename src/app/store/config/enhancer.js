// @flow strict
import { compose, applyMiddleware } from 'redux';
import type { StoreEnhancer } from 'redux';

import middlewares from '@/store/config/middlewares';

import type { State } from '@/store/types/State';
import type { Actions } from '@/store/types/Actions';

type EnhancerType = StoreEnhancer<State, Actions>;

/* eslint-disable */
const devtools =
  typeof window !== 'undefined' &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });
  /* eslint-enable */
const composeEnhancers = devtools || compose;
// eslint-disable-next-line no-underscore-dangle
const enhancer: EnhancerType = composeEnhancers(applyMiddleware(...middlewares));

export default enhancer;
