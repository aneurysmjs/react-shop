/**
 * @module reducers
 */

import * as types from '../ActionTypes';
import makeActionCreator from './makeActionCreator';

export { default as getCountries } from './getCountries';


/**
 *
 * @param {String} selectedCountry
 * @return {Object.<Action>} action
 */
export const setSelectedCountry = makeActionCreator(types.SET_SELECTED_COUNTRY, 'selectedCountry');
