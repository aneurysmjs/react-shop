// @flow strict
/**
 * @module reducers
 */

import { combineReducers } from 'redux';

import type { Actions } from '@/store/types/Actions';

import products from './products';
import footer from './footer';

export default combineReducers<{}, Actions>({
  products,
  footer,
});
