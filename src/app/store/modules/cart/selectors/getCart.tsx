import { State } from '~/shared/types/State';
import { CartType } from '~/store/modules/cart/types';
// eslint-disable-next-line import/prefer-default-export
export const getCart = (state: State): CartType => state.cart;
