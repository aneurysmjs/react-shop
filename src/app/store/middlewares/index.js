/**
 * @module middleware
 */
import thunk from 'redux-thunk';

import logger from './logger';
import apiMiddleware from './apiMiddleware';

/**
 * @type {middleware[]}
 */
// eslint-disable-next-line import/no-mutable-exports
let middlewares = [
  thunk,
  apiMiddleware
];

if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, logger];
}

export default middlewares;
