/* eslint-disable */

import { CartType, CartActionType } from '~/shared/types/CartType';

import { CART_DATA } from '~/store/ActionTypes';

import { createReducer } from '~/store/helpers/createReducer';

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
