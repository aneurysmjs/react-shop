/**
 * @module reducers/selectedCountry
 */

import { SET_SELECTED_COUNTRY }  from '../constants/ActionTypes';

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
export default function selectedCountry(state = 'Colombia', action) {

  switch (action.type) {
    case SET_SELECTED_COUNTRY:
      return action.selectedCountry;

    default:
      return state;
  }

}