/**
 * @module reducers
 */

import { combineReducers } from 'redux';

import selectedCountry from './selectedCountry';
import countries from './countries';

export default combineReducers({
  selectedCountry,
  countries
});