// @flow strict

import type { ProductsType, ProductActionType } from '@/store/types/ProductsType';
import type { State } from '@/store/types/State';

import createReducer from './createReducer';

import { GET_PRODUCTS_SUCCESS } from '../ActionTypes';

export default createReducer<ProductsType, ProductActionType>([], {
  [GET_PRODUCTS_SUCCESS](state, action) {
    const {
      response: {
        data,
      },
    } = action;
    return [...data];
  },
});

export const getProducts = ({ products }: State) => products;
