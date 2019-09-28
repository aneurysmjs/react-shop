// @flow strict
import type { ActionType, Response, ResponseError } from '@/shared/types/CommonType';
import type { State } from '@/shared/types/State';

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

type ProductMetaType = {
  types: Array<string>,
  callAPI: () => Promise<*>,
  shouldCallAPI: (State) => boolean,
};

type ProductPayloadType = Response<Array<ProductType>> & ResponseError;

export type ProductActionType = ActionType<ProductPayloadType, ProductMetaType>;
