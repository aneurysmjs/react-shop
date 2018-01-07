/**
 * @module reducers/movies
 */

import { SET_COUNTRIES }  from '../constants/ActionTypes';

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
export default function countries(state = [], action) {

  switch (action.type) {

    case SET_COUNTRIES:

      return [...action.countries];

    default:
      return state;
  }

}