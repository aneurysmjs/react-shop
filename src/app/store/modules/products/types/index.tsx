/* eslint-disable import/prefer-default-export */
import { ActionType, Response } from '~/shared/types/CommonType';

export enum ProductsActionTypes {
  GetProductsRequest = 'PRODUCTS/GET_PRODUCTS_REQUEST',
  GetProductsSuccess = 'PRODUCTS/GET_PRODUCTS_SUCCESS',
  GetProductsFailure = 'PRODUCTS/GET_PRODUCTS_FAILURE',
}

export type ProductType = {
  _id: string;
  name: string;
  image: string;
  imageHovered: string;
  description: string;
  price: number;
  stock: number;
  shop: string;
};

export type ProductsType = Array<ProductType>;

export type ProductsStateType = {
  isLoading: boolean;
  products: Array<ProductType>;
  error?: Error | null;
};

export type ProductPayloadType = Response<Array<ProductType>> & { error: Error };

export type ProductActionType = ActionType<ProductPayloadType>;
