import api from '~/api';

import { ASYNC_ACTION_TYPE } from '~/constants';

import { ApiMetaType } from '~/shared/types/MiddlewareTypes';
import { ActionCreator } from '~/shared/types/CommonType';

import { FetchProductAction, ProductPayload } from '~/store/modules/products/types';

import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
} from '~/store/modules/products/types/actionTypes';

import { getProducts } from '~/store/modules/products/selectors';

const fetchProductsAction: ActionCreator<ProductPayload, ApiMetaType> = (payload, meta) => {
  return {
    type: ASYNC_ACTION_TYPE,
    payload,
    meta,
  };
};

export default function fetchProducts(query: string): FetchProductAction {
  const productMeta: ApiMetaType = {
    types: [GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE],
    callAPI: () => api.get(query),
    shouldCallAPI: (state) => {
      const { products } = getProducts(state);
      return products.length === 0;
    },
  };

  return fetchProductsAction({} as ProductPayload, productMeta);
}
