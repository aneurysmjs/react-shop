// @flow strict
import * as types from '../ActionTypes';

import makeActionCreator from './makeActionCreator';

export { default as fetchProducts } from './fetchProducts';

export const setSelectedCountry = makeActionCreator(types.SET_SELECTED_PRODUCT, 'selectedCountry');
