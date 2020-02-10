/* eslint-disable @typescript-eslint/ban-ts-ignore */
import products from './products';

import { ProductsActionTypes } from '~/store/modules/products/types';

const productsData = [
  {
    name: 'Nike Air Jordan',
  },
  {
    name: 'Nike Air Force',
  },
];

const response = { data: productsData };
const error = { message: 'Request failed with status code 404' };
const state = {
  isLoading: false,
  products: [],
  error: null,
};

describe('products reducer', () => {
  it('should return the initial state', () => {
    // @ts-ignore - only for testing purposes
    expect(products(undefined, {})).toEqual(state);
  });

  it('should display loading indicator', () => {
    const successAction = {
      type: ProductsActionTypes.GetProductsRequest,
      isLoading: true,
    };
    // @ts-ignore - only for testing purposes
    expect(products({}, successAction)).toEqual({ isLoading: true });
  });

  it('should return products', () => {
    const successAction = {
      type: ProductsActionTypes.GetProductsSuccess,
      payload: { response },
      error: null,
    };
    // @ts-ignore - only for testing purposes
    expect(products([], successAction)).toEqual({ isLoading: false, products: productsData });
  });

  it('should return error', () => {
    const errorAction = {
      type: ProductsActionTypes.GetProductsFailure,
      payload: { error },
    };
    // @ts-ignore - only for testing purposes
    expect(products([], errorAction)).toEqual({ isLoading: false, error });
  });
});
