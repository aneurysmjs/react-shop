/**
 * @module reducers
 */

import { combineReducers } from 'redux';
import movie from './movie';
import movies from './movies';
import searchTerm from './searchTerm';
import selectedCountry from './selectedCountry';
import countries from './countries';

export default combineReducers({
  movie,
  movies,
  searchTerm,
  selectedCountry,
  countries
});