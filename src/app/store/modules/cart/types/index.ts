import { Action } from '~/shared/types/CommonType';

export type CartType = {
  quantity: number;
};

export type CartActionType = Action<CartType>;
