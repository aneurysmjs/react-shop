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

export type ProductsType = {
  isLoading: boolean,
  products: Array<ProductType>,
  error: ?{
    message: string
  },
};

export type ProductActionType = {
  ...$Exact<Action<string>>,
  ...$Exact<Response<Array<ProductType>>>,
  ...$Exact<ResponseError>,
};
