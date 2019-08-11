// @flow strict
import React from 'react';
import { act } from 'react-dom/test-utils';
// $FlowFixMe
import { render, cleanup } from '@testing-library/react';

import Icon from './Icon';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('Icon', () => {
  it('should have "src" equal to icon\'s path and height/width to 16px', async () => {
    let testRenderer = {};
    const iconPath = 'icons/cart';
    const host = 'http://localhost';
    const fullPath = `${host}/cart.svg`;

    await act(async () => {
      testRenderer = render(<Icon path={iconPath} />);
    });

    const { container } = testRenderer;
    const img = container.firstChild;
    expect(img.src).toEqual(fullPath);
  });
});
