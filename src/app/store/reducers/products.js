// @flow strict

import createReducer from './createReducer';

import { GET_PRODUCTS_SUCCESS } from '../ActionTypes';

export default createReducer([], {
  [GET_PRODUCTS_SUCCESS](state, action) {
    const {
      response: {
        data
      }
    } = action;
    return [...data];
  }
});