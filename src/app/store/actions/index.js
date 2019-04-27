/**
 * @module reducers
 */

import * as types from '../ActionTypes';

import makeActionCreator from './makeActionCreator';

export { default as getProducts } from './getProducts';

export const setSelectedCountry = makeActionCreator(types.SET_SELECTED_PRODUCT, 'selectedCountry');
