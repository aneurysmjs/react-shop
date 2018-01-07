/**
 * @module reducers
 */

import * as types from '../constants/ActionTypes';
import makeActionCreator from './makeActionCreator';
import api from 'api';

/**
 *
 * @param {String} searchTerm
 * @return {Object.<Action>} action
 */
export const setSearchTerm = makeActionCreator(types.SET_SEARCH_TERM, 'searchTerm');


/**
 *
 * @param {String} selectedCountry
 * @return {Object.<Action>} action
 */
export const setSelectedCountry = makeActionCreator(types.SET_SELECTED_COUNTRY, 'selectedCountry');

/**
 *
 * @param {Array.<Object>} movies
 * @return {Object.<Action>}
 */
export const setMovies = makeActionCreator(types.SET_MOVIES, 'movies');

/**
 *
 * @param {String} url
 * @return {Function} async function
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

/**
 *
 * @param {Object} movie
 * @return {Object.<Action>}
 */
export const setMovie = makeActionCreator(types.SET_MOVIE, 'movie');

/**
 *
 * @param {String} id
 * @return {Function} function
 */
export function getMovie(id) {

  return function (dispatch, getState) {

    const movies = getState().movies;

    const movie = movies.filter(m => m.id === +id)[0];

    dispatch(setMovie(movie));

  };

}

/**
 *
 * @param {Array.<Object>} countries
 * @return {Object.<Action>}
 */
export const setCountries = makeActionCreator(types.SET_COUNTRIES, 'countries');

/**
 *
 * @param {String} url
 * @return {Function} async function
 */
export function getCountries(url) {
  /**
   * 'dispatch' is the same one that we use to dispatch actions to Redux
   *
   * 'getState' is a function that if you need to do something based on
   * the Redux store's data, you can call it to get the current state.
   */
  return async function (dispatch, getState) {
    try {
      const { data } = await api.get(url);
      dispatch(setCountries(data));
    } catch (err) {
      throw new Error('ReactMovies: ', err);
    }
  };

}

