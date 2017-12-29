import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Searcher from './RmSearcher';

test('Searcher snapshot test', () => {

  const component = shallow(<Searcher />);
  const tree = shallowToJson(component);

  expect(tree).toMatchSnapshot();

});