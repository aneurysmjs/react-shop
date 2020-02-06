import { Action } from '~/shared/types/CommonType';

export interface Cart {
  quantity: number;
}

export type CartAction = Action<Cart>;
