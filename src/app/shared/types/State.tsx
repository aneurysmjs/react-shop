import { CartType } from '~/shared/types/CartType';
import { FooterType } from '~/shared/types/FooterType';
import { ProductsType } from '~/store/modules/products/types';

export type State = {
  cart: CartType;
  footer: FooterType;
  products: ProductsType;
};
