/**
 * @module reducers/movies
 */
import createReducer from './createReducer';

import { SET_MOVIES }  from '../constants/ActionTypes';

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
export default createReducer([], {
  [SET_MOVIES](state, action) {
    return [...action.movies];
  }
});