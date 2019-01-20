import reducers from './index';
import movies from '../assets/json/movies';

test('SET_MOVIES', () => {

  let state;

  state = reducers({searchTerm: '', selectedCountry: 'Colombia', movies: []}, {
    type: 'SET_MOVIES',
    movies
  });

  expect(state).toEqual({
    searchTerm: '',
    selectedCountry: 'Colombia',
    movies
  });

});
