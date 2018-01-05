/**
 * @module reducers/movies
 */

import { SET_MOVIES }  from '../constants/ActionTypes';

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
export default function movies(state = [], action) {
  switch (action.type) {

    case SET_MOVIES:

      return [...action.movies];

    default:
      return state;
  }

}