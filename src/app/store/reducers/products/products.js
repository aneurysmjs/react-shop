// @flow strict
import type { ProductsType, ProductActionType } from '@/store/types/ProductsType';

import createReducer from '../createReducer';

import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from '../../ActionTypes';

type ProductsReducerType = {
  isLoading: boolean,
  payload: ProductsType,
  error: ?{
    message: string,
  }
}

const initialState = {
  error: null,
  isLoading: false,
  payload: [],
};

export default createReducer<ProductsReducerType, ProductActionType>(initialState, {
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
      payload: [...data],
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
