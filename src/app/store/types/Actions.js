// @flow strict

import type { FooterActionType } from '@/store/types/FooterType';
import type { CartActionType } from '@/store/types/CartType';
import type { ProductActionType } from '@/store/types/ProductsType';

export type Actions =
  CartActionType |
  FooterActionType |
  ProductActionType;

export type AsyncAction<S> = {
  types?: Array<string>,
  callAPI?: () => Promise<*>,
  shouldCallAPI?: (S) => boolean,
  payload?: *,
};

export type MiddlewareAction<S> = {
  type: string,
  ...AsyncAction<S>
};
