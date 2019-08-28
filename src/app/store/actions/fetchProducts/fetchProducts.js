// @flow strict

import { api } from '@/api';

import { ASYNC_ACTION_TYPE } from '@/constants';
import * as types from '@/store/ActionTypes';
import type { State } from '@/store/types/State';
import type { AsyncAction } from '@/store/types/Actions';
import type { ProductsType } from '@/store/types/ProductsType';

import { getProducts } from '@/store/selectors/getProducts';

export default function fetchProducts(query: string = ''): AsyncAction<State> {
  return {
    type: ASYNC_ACTION_TYPE,
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
