// @flow strict
import React from 'react';
// $FlowFixMe
import { render } from '@testing-library/react';

import Icon from './Icon';

describe('Icon', () => {

  it('should have "src" equal to empty string and height and width to 16px', () => {
    const { container } = render(<Icon path="icons/cart" />);
    const img = container.firstChild;
    expect(img.src).toEqual('');
    expect(img.style.height).toEqual('16px');
    expect(img.style.width).toEqual('16px');    
  });
});
