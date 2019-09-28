// @flow strict

import { api } from '@/api';

import { ASYNC_ACTION_TYPE } from '@/constants';
import * as types from '@/store/ActionTypes';

import { makeActionCreator } from '@/store/helpers/makeActionCreator';

import type { AsyncAction } from '@/store/types/Actions';
import type { ProductsType } from '@/store/types/ProductsType';

import { getProducts } from '@/store/modules/products/selectors';

export default function fetchProducts(query: string = ''): AsyncAction {
  const meta = {
    types: [
      types.GET_PRODUCTS_REQUEST,
      types.GET_PRODUCTS_SUCCESS,
      types.GET_PRODUCTS_FAILURE,
    ],
    callAPI: () => api.get<string, ProductsType>(query),
    shouldCallAPI: (state) => {
      const products = getProducts(state);
      // $FlowFixMe - это не должно орать
      return !products.length;
    },
  };

  return makeActionCreator(ASYNC_ACTION_TYPE)({}, meta);
}
