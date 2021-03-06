import { compose, applyMiddleware } from 'redux';

import middlewares from '~/store/config/middlewares';

/* eslint-disable */
const devtools =
  typeof window !== 'undefined' &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });
  /* eslint-enable */
const composeEnhancers = devtools || compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export default enhancer;
