import { combineReducers } from 'redux';

import { footer } from '~/store/modules/footer/reducers';
import { cart } from '~/store/modules/cart/reducers';
import { products } from '~/store/modules/products/reducers';

export default combineReducers({
  cart,
  footer,
  products,
});
