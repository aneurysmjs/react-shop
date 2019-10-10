import { State } from '~/shared/types/State';
import { ProductsStateType } from '~/store/modules/products/types';
// eslint-disable-next-line import/prefer-default-export
export const getProducts = ({ products }: State): ProductsStateType => products;
