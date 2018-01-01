/**
 * @module reducers/searchTerm
 */

import { SET_SEARCH_TERM }  from '../constants/ActionTypes';

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
export default function searchTerm(state = '', action) {

  switch (action.type) {

    case SET_SEARCH_TERM:
      return action.searchTerm;

    default:
      return state;
  }

}