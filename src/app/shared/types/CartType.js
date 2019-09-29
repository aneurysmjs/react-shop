// @flow strict
import type { ActionType } from '@/shared/types/CommonType';

export type CartType = {
  quantity: number
};

export type CartActionType = ActionType<CartType>;
