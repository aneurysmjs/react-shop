import { ActionCreator } from '~/shared/types/CommonType';

import { CART_DATA } from '../types/actionTypes';
import { Cart } from '../types';

const cartAction: ActionCreator<Cart> = (payload) => ({ type: CART_DATA, payload });

export default cartAction;
