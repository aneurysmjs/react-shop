// @flow strict

import type { CartType } from '@/shared/types/CartType';
import type { FooterType } from '@/shared/types/FooterType';
import type { ProductsType } from '@/shared/types/ProductsType';

export type State = {
  cart: CartType,
  footer: FooterType,
  products: ProductsType,
};
