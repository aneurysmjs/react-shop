import { State } from '~/shared/types/State';
import { ProductsType } from '~/store/modules/products/types';
// eslint-disable-next-line import/prefer-default-export
export const getProducts = ({ products }: State): ProductsType => products;
