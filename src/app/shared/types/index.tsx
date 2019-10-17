/* eslint-disable import/prefer-default-export */
import { Reducer } from 'redux';
import { ProductsStateType } from '~/store/modules/products/types';

export type valueof<T> = T[keyof T];

export const PRODUCTS_NAMESPACE_KEY = 'PRODUCTS_NAMESPACE';

export const INIT_DYNO_STATE = 'INIT_DYNO_STATE';

export type FullStoreShape = {
  [INIT_DYNO_STATE]: {};
  [PRODUCTS_NAMESPACE_KEY]: ProductsStateType;
};

export type StoreShape = Partial<FullStoreShape>;
export type NamespaceKey = keyof StoreShape;
export type ReducerMap = Partial<{ [k in NamespaceKey]: Reducer<FullStoreShape[k]> }>;
