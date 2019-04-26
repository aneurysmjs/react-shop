/**
 * @module reducers
 */

import { combineReducers } from 'redux';

import selectedProduct from './selectedProduct';
import products from './products';

export default combineReducers({
  selectedProduct,
  products
});