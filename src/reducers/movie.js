/**
 * @module reducers/movie
 */

import { SET_MOVIE }  from '../constants/ActionTypes';

/**
 *
 * @param {Object} state = {}
 * @param {Object} action
 * @return {Object} new state
 */
export default function movies(state = {}, action) {

  switch (action.type) {

    case SET_MOVIE:

      return {
        ...state,
        movie: action.movie
      };

    default:
      return state;

  }

}