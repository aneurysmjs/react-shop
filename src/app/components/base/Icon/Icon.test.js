// @flow strict
import React from 'react';
// $FlowFixMe
import { render } from '@testing-library/react';

import Icon from './Icon';

describe('Icon', () => {

  it('should have "src" equal to empty string', () => {
    const { container } = render(<Icon name="cart" />);
    const img = container.firstChild;
    expect(img.src).toEqual('');
  });
});
