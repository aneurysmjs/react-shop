/**
 * @module reducers/movie
 */

import { SET_MOVIE }  from '../constants/ActionTypes';

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
export default function movies(state = {}, action) {

  switch (action.type) {

    case SET_MOVIE:

      return action.movie;

    default:
      return state;
  }

}