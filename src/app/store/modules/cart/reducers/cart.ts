import { CartType, CartActionType } from '~/store/modules/cart/types';

import { CART_DATA } from '~/store/ActionTypes';

const initialState = {
  quantity: 0,
};

function cartReducer(state: CartType = initialState, action: CartActionType): CartType {
  switch (action.type) {
    case CART_DATA: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}

export default cartReducer;
