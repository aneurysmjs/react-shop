import { FooterType } from '~/shared/types/FooterType';
import { ProductsType } from '~/store/modules/products/types';

export type State = {
  footer: FooterType;
  products: ProductsType;
};
