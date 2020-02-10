/* eslint-disable import/prefer-default-export */
import { Action, ResponseAndError } from '~/shared/types/CommonType';

export interface Product {
  _id: string;
  name: string;
  image: string;
  imageHovered: string;
  description: string;
  price: number;
  stock: number;
  shop: string;
}

export type Products = Array<Product>;

export interface ProductsState {
  isLoading: boolean;
  products: Products;
  error?: Error | null;
}

export type ProductPayload = ResponseAndError<Products>;

export type FetchProductAction = Action<ProductPayload>;
