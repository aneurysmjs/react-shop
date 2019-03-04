/**
 * @module reducers/selectedCountry
 */

import createReducer from './createReducer';

import { SET_SELECTED_COUNTRY }  from '../ActionTypes';

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
export default createReducer('Colombia', {
  [SET_SELECTED_COUNTRY](state, action) {
    return action.selectedCountry;
  }
});
