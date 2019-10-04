/* eslint-disable */

import { CartType } from '~/shared/types/CartType';
import { FooterType } from '~/shared/types/FooterType';
import { ProductsType } from '~/shared/types/ProductsType';

export type State = {
  cart: CartType,
  footer: FooterType,
  products: ProductsType,
};
