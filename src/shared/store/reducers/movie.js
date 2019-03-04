/**
 * @module reducers/movie
 */

import createReducer from './createReducer';

import { SET_MOVIE } from '../ActionTypes';

/**
 *
 * @param {Object} state = {}
 * @param {Object} action
 * @return {Object} new state
 */
export default createReducer({}, {
  [SET_MOVIE](state, action) {
    return {
      ...state,
      movie: action.movie
    };
  }
});
