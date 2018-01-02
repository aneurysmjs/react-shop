/**
 * @module reducers
 */

import * as types from '../constants/ActionTypes';

/**
 *
 * @param {String} searchTerm
 * @return {Object.<Action>} action
 */
export function setSearchTerm(searchTerm) {
  return {
    type: types.SET_SEARCH_TERM,
    searchTerm
  };
}

/**
 *
 * @param {String} selectedCountry
 * @return {Object.<Action>} action
 */
export function setSelectedCountry(selectedCountry) {
  return {
    type: types.SET_SELECTED_COUNTRY,
    selectedCountry
  };
}