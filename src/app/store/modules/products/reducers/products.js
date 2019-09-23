// @flow strict
import type { ProductsType, ProductActionType } from '@/store/types/ProductsType';

import { createReducer } from '@/store/helpers/createReducer';

import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from '@/store/ActionTypes';

const initialState = {
  error: null,
  isLoading: false,
  products: [],
};

export default createReducer<ProductsType, ProductActionType>(initialState, {
  [GET_PRODUCTS_REQUEST](state) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [GET_PRODUCTS_SUCCESS](state, action) {
    const {
      response: {
        data,
      },
    } = action;
    return {
      ...state,
      isLoading: false,
      products: [...data],
    };
  },
  [GET_PRODUCTS_FAILURE](state, action) {
    const { error } = action;
    return {
      ...state,
      isLoading: false,
      error,
    };
  },
});
