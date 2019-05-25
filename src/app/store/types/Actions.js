// @flow strict

import type { ProductActionType } from '@/store/types/ProductsType';

export type Actions = 
  ProductActionType

export type ApiMiddlewareAction<S> = {
  type: string,
  types?: Array<string>,
  callAPI?: () => Promise<*>,
  shouldCallAPI?: (S) => boolean,
  payload?: *,
};

export type MiddlewareAction<S> =
  ApiMiddlewareAction<S>
