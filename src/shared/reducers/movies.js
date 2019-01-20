/**
 * @module reducers/movies
 */
import createReducer from './createReducer';

import { MOVIES_SUCCESS }  from '../constants/ActionTypes';

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
export default createReducer([], {
  [MOVIES_SUCCESS](state, action) {
    const {
      response: {
        data: {
          results
        },
      },
    } = action;
    return [...results];
  }
});