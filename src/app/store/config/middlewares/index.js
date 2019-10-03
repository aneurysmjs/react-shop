// @flow strict
// $FlowFixMe
import thunk from 'redux-thunk';

import apiMiddleware from './apiMiddleware';
import logger from './logger';

// eslint-disable-next-line import/no-mutable-exports
let middlewares = [
  thunk,
  apiMiddleware,
];

if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, logger];
}

export default middlewares;
