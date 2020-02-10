import { Cart } from '~/store/modules/cart/types';
import { FooterState } from '~/store/modules/footer/types';
import { ProductsState } from '~/store/modules/products/types';

export type State = {
  cart: Cart;
  footer: FooterState;
  products: ProductsState;
};
