// @flow strict
import React from 'react';
import { shallow } from 'enzyme';

import Spinner from './Spinner';

describe('Spinner', () => {
  const defaultProps = {};

  it('tests something', () => {
    shallow(<Spinner {...defaultProps} />);
  });
});