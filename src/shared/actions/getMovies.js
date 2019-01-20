import api from 'api';

import * as types from '../constants/ActionTypes';

const API_KEY = 'cb8c255cd5c9be31d0d60734f0bbef58';

/**
 *
 * @param {String} query = ''
 * @return {{}}
 */
export function getMovies(query = '') {
  const url = `https://api.themoviedb.org/3/${query}?api_key=${API_KEY}&language=en-US&page=1`;
  console.log('url', url);
  return {
    types: [
      types.MOVIES_REQUEST,
      types.MOVIES_SUCCESS,
      types.MOVIES_FAILURE
    ],
    callAPI: () => api.get(url),
  };

}