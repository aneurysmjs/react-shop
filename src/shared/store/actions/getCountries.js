// @flow strict

import api from 'api';

import * as types from '../ActionTypes';

export default function getCountries(query: string = '') {

  return {
    types: [
      types.GET_COUNTRIES_REQUEST,
      types.GET_COUNTRIES_SUCCESS,
      types.GET_COUNTRIES_FAILURE
    ],
    callAPI: () => api.get(query),
  };

}