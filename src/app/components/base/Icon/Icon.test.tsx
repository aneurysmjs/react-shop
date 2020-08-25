import React from 'react';
import { render, cleanup, RenderResult, act } from '@testing-library/react';

import Icon from './Icon';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const defaultSize = '16px';

describe('Icon', () => {
  it('should have "src" equal to icon\'s path and height/width to 16px', async () => {
    let testRenderer = {} as RenderResult;
    const iconPath = 'icons/cart';
    const host = 'http://localhost';
    const fullPath = `${host}/cart.svg`;

    await act(async () => {
      testRenderer = render(<Icon path={iconPath} />);
    });

    const { container } = testRenderer;
    const img = container.firstChild as HTMLImageElement;

    expect(img.style.height).toEqual(defaultSize);
    expect(img.style.width).toEqual(defaultSize);
    expect(img.src).toEqual(fullPath);
  });
});
