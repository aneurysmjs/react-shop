// @flow strict
/**
 * @module reducers
 */

import { combineReducers } from 'redux';

import type { Actions } from '@/store/types/Actions';

import cart from './cart';
import footer from './footer';
import products from './products';

export default combineReducers<{}, Actions>({
  cart,
  footer,
  products,
});
