/**
 * @module reducers/movies
 */

import createReducer from './createReducer';

import { GET_COUNTRIES_SUCCESS }  from '../ActionTypes';

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
export default createReducer([], {
  [GET_COUNTRIES_SUCCESS](state, action) {
    const {
      response: {
        data
      }
    } = action;
    return [...data];
  }
});