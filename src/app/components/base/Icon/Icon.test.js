// @flow strict
import React from 'react';
import { render } from 'react-testing-library';

import Icon from './Icon';

describe('Icon', () => {

  it('should have "src" equal to empty string', () => {
    const { container } = render(<Icon name="cart" />);
    const img = container.firstChild;
    expect(img.src).toEqual('');
  });
});
