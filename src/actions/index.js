import * as types from '../constants/ActionTypes';

export function setSearchTerm(searchTerm) {
  return {
    type: types.SET_SEARCH_TERM,
    searchTerm
  };
}