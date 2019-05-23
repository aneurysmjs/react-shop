// @flow strict
import type { Action } from 'redux';

import type { Response } from '@/store/types/CommonType';
import type { ProductType } from '@/store/types/ProductsType';

import createReducer from './createReducer';

import { GET_PRODUCTS_SUCCESS } from '../ActionTypes';

type ProductsType = Array<ProductType>;

type ProductActionType = {
  ...$Exact<Action<string>>,
  ...$Exact<Response<ProductsType>>
};

export default createReducer<ProductsType, ProductActionType>([], {
  [GET_PRODUCTS_SUCCESS](state, action) {
    const {
      response: {
        data
      }
    } = action;
    return [...data];
  }
});
