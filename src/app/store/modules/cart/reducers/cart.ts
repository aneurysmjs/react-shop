import { Reducer } from 'redux';
import { Cart, CartAction } from '../types';

import { CART_DATA } from '../types/actionTypes';

const initialState = {
  quantity: 0,
};

const cartReducer: Reducer<Cart, CartAction> = (state = initialState, action): Cart => {
  switch (action.type) {
    case CART_DATA: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
