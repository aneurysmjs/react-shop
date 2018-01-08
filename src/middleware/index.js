/**
 * @module middleware
 */
import thunk from 'redux-thunk';

import logger from './logger';

/**
 * @type {Object.<middleware>[]}
 */
let middleware = [
  thunk
];

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger];
}

export default middleware;
