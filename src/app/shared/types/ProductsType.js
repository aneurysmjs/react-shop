// @flow strict
import type { ActionType, Response, ResponseError } from '@/shared/types/CommonType';
import type { ApiMetaType } from '@/shared/types/MiddlewareTypes';

export type ProductType = {
  _id: string,
  name: string,
  image: string,
  imageHovered: string,
  description: string,
  price: number,
  stock: number,
  shop: string,
};

export type ProductsType = {
  isLoading: boolean,
  products: Array<ProductType>,
  ...$Exact<ResponseError>,
};

type ProductPayloadType = $Shape<Response<Array<ProductType>> & ResponseError>;

export type ProductActionType = ActionType<ProductPayloadType, ApiMetaType>;
