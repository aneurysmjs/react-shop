// @flow strict

import { api } from '@/api';

import * as types from '../ActionTypes';

export default function getCountries(query: string = '') {

  return {
    types: [
      types.GET_PRODUCTS_REQUEST,
      types.GET_PRODUCTS_SUCCESS,
      types.GET_PRODUCTS_FAILURE
    ],
    callAPI: () => api.get(query),
  };

}