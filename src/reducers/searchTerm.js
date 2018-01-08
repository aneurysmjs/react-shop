/**
 * @module reducers/searchTerm
 */
import createReducer from './createReducer';

import { SET_SEARCH_TERM }  from '../constants/ActionTypes';


/**
 *
 * @param state
 * @param action
 * @return {Function} reducer
 */
export default createReducer('', {
  [SET_SEARCH_TERM](state, action) {
    return action.searchTerm;
  }
});