import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import MovieDetails from './RmMovieDetails';

test('MovieDetails snapshot test', () => {

  const component = shallow(<MovieDetails />);
  const tree = shallowToJson(component);

  expect(tree).toMatchSnapshot();

});