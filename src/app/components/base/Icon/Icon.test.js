// @flow strict
import React from 'react';
import { shallow } from 'enzyme';

import Icon from './Icon';

describe('Icon', () => {
  // const defaultProps = {};

  it('should have "name" and "selected" equal to undefined', () => {
    const wrap = shallow(<Icon />);
    expect(wrap.prop('name')).toEqual(undefined);
    expect(wrap.prop('selected')).toEqual(undefined);
  });
});
