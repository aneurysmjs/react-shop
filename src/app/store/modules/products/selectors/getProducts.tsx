import { State } from '~/store/State';
import { ProductsState } from '~/store/modules/products/types';
// eslint-disable-next-line import/prefer-default-export
export const getProducts = ({ products }: State): ProductsState => products;
