// @flow strict
import type { Action } from 'redux';

import type { Response, ResponseError, Base } from '@/store/types/CommonType';

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

export type ProductsType = Base<Array<ProductType>>;
// export type ProductsType = {
//   isLoading: boolean,
//   payload: Array<ProductType>,
//   ...$Exact<ResponseError>,
// };

export type ProductActionType = {
  ...$Exact<Action<string>>,
  ...$Exact<Response<Array<ProductType>>>,
  ...$Exact<ResponseError>,
};
