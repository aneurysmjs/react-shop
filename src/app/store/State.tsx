import { FooterType } from '~/shared/types/FooterType';
import { ProductsStateType } from '~/store/modules/products/types';

export type State = {
  footer: FooterType;
  products: ProductsStateType;
};
