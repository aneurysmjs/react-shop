// @flow strict

import { api } from '@/api';

import { getProducts } from '@/store/reducers/products';
import type { AsyncAction } from '@/store/types/Actions';
import type { ProductsType } from '@/store/types/ProductsType';
import type { State } from '@/store/types/State';

import * as types from '../ActionTypes';

export default function fetchProducts(query: string = ''): AsyncAction<State> {
  return {
    types: [
      types.GET_PRODUCTS_REQUEST,
      types.GET_PRODUCTS_SUCCESS,
      types.GET_PRODUCTS_FAILURE,
    ],
    callAPI: () => api.get<string, ProductsType>(query),
    shouldCallAPI: (state: State) => {
      const products = getProducts(state);
      return !products.length;
    },
  };
}
