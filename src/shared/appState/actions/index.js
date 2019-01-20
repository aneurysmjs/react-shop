/**
 * @module reducers
 */

import * as types from '../ActionTypes';
import makeActionCreator from './makeActionCreator';
import api from 'api';

import { getCountries as getCountriesAction } from './getCountries';
import { getMovies as getMoviesAction } from './getMovies';

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

export const getMovies = getMoviesAction;

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
 * @type {Function} getCountries
 */
export const getCountries = getCountriesAction;