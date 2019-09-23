// @flow strict

import type { CartActionType } from '@/store/types/CartType';
import type { FooterActionType } from '@/store/types/FooterType';
import type { ProductActionType } from '@/store/types/ProductsType';
import type { State } from '@/store/types/State';

export type Actions =
  CartActionType |
  FooterActionType |
  ProductActionType;

export type AsyncAction = {
  type: string,
  payload?: *,
  meta?: {
    types: Array<string>,
    callAPI: () => Promise<*>,
    shouldCallAPI?: (State) => boolean,
  }
};
