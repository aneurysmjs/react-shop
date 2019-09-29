// @flow strict
import type {
  ActionType,
  ApiMetaType,
  Response,
  ResponseError,
} from '@/shared/types/CommonType';

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

type ProductPayloadType = Response<Array<ProductType>> & ResponseError;

export type ProductActionType = ActionType<ProductPayloadType, ApiMetaType>;
