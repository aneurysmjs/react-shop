// @flow strict
import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

describe.skip('Header', () => {
  const defaultProps = {};

  it('tests something', () => {
    shallow(<Header {...defaultProps} />);
  });
});
