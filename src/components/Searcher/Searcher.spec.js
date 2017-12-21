import React from 'react';
import renderer from 'react-test-renderer';
import Searcher from './Searcher';

test('Searcher snapshot test', () => {

  const component = renderer.create(<Searcher />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();

});