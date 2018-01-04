/**
 * @module reducers
 */

import * as types from '../constants/ActionTypes';
import api from 'api';

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


export function setMovies(movies) {
  return {
    type: types.SET_MOVIES,
    movies
  };
}

/**
 *
 * @param {String} url
 * @return {Object.<Action>} action
 */
export function getMovies(url) {
  /**
   * 'dispatch' is the same one that we use to dispatch actions to Redux
   *
   * 'getState' is a function that if you need to do something based on
   * the Redux store's data, you can call it to get the current state.
   */
  return async function (dispatch, getState) {
    try {
      const { data } = await api.get(url);
      dispatch(setMovies(data));
    } catch (err) {
      throw new Error('ReactMovies: ', err);
    }
  };

}