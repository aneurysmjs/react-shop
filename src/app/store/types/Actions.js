// @flow strict

import type { ProductActionType } from '@/store/types/ProductsType';

export type Actions = 
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
