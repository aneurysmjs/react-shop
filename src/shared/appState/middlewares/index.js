/**
 * @module middleware
 */
import thunk from 'redux-thunk';

import logger from './logger';
import apiMiddleware from './apiMiddleware';

/**
 * @type {middleware[]}
 */
let middlewares = [
  thunk,
  apiMiddleware
];

if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, logger];
}

export default middlewares;
