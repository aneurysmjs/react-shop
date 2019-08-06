// @flow strict

import type { ProductsType } from '@/store/types/ProductsType';
import type { FooterType } from '@/store/types/FooterType';

export type State = {
  products: ProductsType,
  footer: FooterType
};
