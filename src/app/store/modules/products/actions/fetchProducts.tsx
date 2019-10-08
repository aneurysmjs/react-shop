import api from '~/api';

import { ASYNC_ACTION_TYPE } from '~/constants';

import makeActionCreator from '~/store/helpers/makeActionCreator';
import { ApiMetaType } from '~/shared/types/MiddlewareTypes';

import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  ProductType,
  // ProductsType,
  ProductActionType,
} from '~/store/modules/products/types';

import { getProducts } from '~/store/modules/products/selectors';

const actionCreator = makeActionCreator(ASYNC_ACTION_TYPE);

export default function fetchProducts(query = ''): ProductActionType {
  const meta: ApiMetaType<Array<ProductType>> = {
    types: [GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE],
    callAPI: () => api.get(query),
    shouldCallAPI: state => {
      const products = getProducts(state);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return !products.length; // <- это не должно орать
    },
  };

  return actionCreator<{}, typeof meta>({}, meta);
}
