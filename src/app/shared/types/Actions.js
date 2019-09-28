// @flow strict
import type { CartActionType } from '@/shared/types/CartType';
import type { FooterActionType } from '@/shared/types/FooterType';
import type { ProductActionType } from '@/shared/types/ProductsType';
import type { State } from '@/shared/types/State';

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
