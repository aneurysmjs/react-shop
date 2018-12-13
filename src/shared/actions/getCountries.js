import api from 'api';

import * as types from '../constants/ActionTypes';

/**
 *
 * @param {String} query = ''
 * @return {{}}
 */
export function getCountries(query = '') {

  return {
    types: [
      types.GET_COUNTRIES_REQUEST,
      types.GET_COUNTRIES_SUCCESS,
      types.GET_COUNTRIES_FAILURE
    ],
    callAPI: () => api.get(query),
  };

}