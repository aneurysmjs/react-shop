import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import moviesData from '../../assets/json/movies';
import MovieCard from '../../components/MovieCard/MovieCard';
import Movies from './Movies';

test('Movies snapshot test', () => {

  const component = shallow(<Movies />);
  const tree = shallowToJson(component);

  expect(tree).toMatchSnapshot();

});

test('Render MovieCard for each Movie', () => {

  const component = shallow(<Movies />);
  expect(moviesData.length).toEqual(component.find(MovieCard).length);

});