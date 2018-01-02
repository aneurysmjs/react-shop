/**
 * @module reducers
 */

import { combineReducers } from 'redux';
import searchTerm from './searchTerm';
import selectedCountry from './selectedCountry';

export default combineReducers({
  searchTerm,
  selectedCountry
});