// @flow strict
import type { Action } from 'redux';

import type { Response, ResponseError } from '@/store/types/CommonType';

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

export type ProductsType = Array<ProductType>;

export type ProductActionType = {
  ...$Exact<Action<string>>,
  ...$Exact<Response<ProductsType>>,
  ...$Exact<ResponseError>,
};
