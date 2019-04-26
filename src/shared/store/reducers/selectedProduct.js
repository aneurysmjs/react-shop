/**
 * @module reducers/selectedCountry
 */

import createReducer from './createReducer';

import { SET_SELECTED_PRODUCT }  from '../ActionTypes';

export default createReducer('Colombia', {
  [SET_SELECTED_PRODUCT](state, action) {
    return action.selectedCountry;
  }
});
