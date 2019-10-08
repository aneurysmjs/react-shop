import { ActionType, Response, ResponseError } from '~/shared/types/CommonType';

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

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

export type ProductsType = {
  isLoading: boolean;
  products: Array<ProductType>;
  error?: ResponseError;
};

type ProductPayloadType = Response<Array<ProductType> & ResponseError>;

export type ProductActionType = ActionType<ProductPayloadType>;
