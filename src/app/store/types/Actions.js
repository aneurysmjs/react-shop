// @flow strict

import type { ProductActionType } from '@/store/types/ProductsType';
import type { FooterActionType } from '@/store/types/FooterType';

export type Actions = 
  ProductActionType |
  FooterActionType;

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
