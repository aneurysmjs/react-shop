/**
 * @module reducers
 */

import { combineReducers } from 'redux';
import movies from './movies';
import searchTerm from './searchTerm';
import selectedCountry from './selectedCountry';
import countries from './countries';

export default combineReducers({
  movies,
  searchTerm,
  selectedCountry,
  countries
});