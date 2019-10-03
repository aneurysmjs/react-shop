/* eslint-disable */
import { ActionType } from '~/shared/types/CommonType';

export type CartType = {
  quantity: number
};

export type CartActionType = ActionType<CartType>;
