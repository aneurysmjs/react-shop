/* eslint-disable */

import { combineReducers } from 'redux';

import { Actions } from '~/shared/types/Actions';

import { footer } from '~/store/modules/footer/reducers';
import { cart } from '~/store/modules/cart/reducers';
import { products } from '~/store/modules/products/reducers';

export default combineReducers<{}, Actions>({
  cart,
  footer,
  products,
});
