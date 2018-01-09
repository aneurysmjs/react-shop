/**
 * @module reducers/movies
 */

import createReducer from './createReducer';

import { SET_COUNTRIES }  from '../constants/ActionTypes';

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
export default createReducer([], {
  [SET_COUNTRIES](state, action) {
    return [...action.countries];
  }
});