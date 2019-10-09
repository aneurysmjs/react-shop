import React, { ReactElement } from 'react';
import { act } from 'react-dom/test-utils';
import { render, RenderResult } from '@testing-library/react';

import LazyComponent from './LazyComponent';

const Example = (): ReactElement => <div>Some Component</div>;

describe('LazyComponent', () => {
  // eslint-disable-next-line prettier/prettier
  it('should have component\'s name as className', async () => {
    let testRenderer = {} as RenderResult;

    await act(async () => {
      testRenderer = render(
        <LazyComponent
          getModule={(): Promise<{ default: () => ReactElement }> =>
            Promise.resolve({ default: Example })
          }
        />,
      );
    });
    const { container } = testRenderer;
    const div = container.firstChild as HTMLDivElement;

    expect(div.textContent).toEqual('Some Component');
  });
});
