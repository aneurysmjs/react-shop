import { FooterType } from '~/shared/types/FooterType';
import { ProductsState } from '~/store/modules/products/types';

export type State = {
  footer: FooterType;
  products: ProductsState;
};
