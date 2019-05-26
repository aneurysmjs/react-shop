// @flow strict

import { api } from '@/api';

import type { AsyncAction } from '@/store/types/Actions';
import type { ProductsType } from '@/store/types/ProductsType';

import * as types from '../ActionTypes';

export default function fetchProducts(query: string = ''): AsyncAction<ProductsType> {

  return {
    types: [
      types.GET_PRODUCTS_REQUEST,
      types.GET_PRODUCTS_SUCCESS,
      types.GET_PRODUCTS_FAILURE
    ],
    callAPI: () => api.get<string, ProductsType>(query),
  };

}