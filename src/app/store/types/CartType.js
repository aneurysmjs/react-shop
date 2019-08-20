// @flow strict
import type { Action } from 'redux';

export type CartType = {
  quantity: number
};

export type CartActionType = {
  ...$Exact<Action<string>>,
  ...$Exact<CartType>
};
