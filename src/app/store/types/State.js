// @flow strict

import type { CartType } from '@/store/types/CartType';
import type { FooterType } from '@/store/types/FooterType';
import type { ProductsType } from '@/store/types/ProductsType';

export type State = {
  cart: CartType,
  footer: FooterType,
  products: ProductsType,
};
