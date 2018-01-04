/**
 * @module reducers
 */

import { combineReducers } from 'redux';
import searchTerm from './searchTerm';
import selectedCountry from './selectedCountry';
import movies from './movies';

export default combineReducers({
  searchTerm,
  selectedCountry,
  movies
});