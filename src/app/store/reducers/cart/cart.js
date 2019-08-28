// @flow strict

import type { CartType, CartActionType } from '@/store/types/CartType';

import { CART_DATA } from '@/store/ActionTypes';

import createReducer from '../createReducer';

const initialState = {
  quantity: 0,
};

export default createReducer<CartType, CartActionType>(initialState, {
  [CART_DATA](state) {
    return {
      ...state,
    };
  },
});
