import { State } from '~/shared/types/State';
import { ProductsType } from '~/shared/types/ProductsType';
// eslint-disable-next-line import/prefer-default-export
export const getProducts = ({ products }: State): ProductsType => products;
