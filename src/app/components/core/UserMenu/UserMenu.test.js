// @flow strict
import React from 'react';
import { act } from 'react-dom/test-utils';
// $FlowFixMe
import { fireEvent, render } from '@testing-library/react';
import { createStore } from 'redux';
// $FlowFixMe
import { Provider } from 'react-redux';

import reducer from '@/store/reducers';

import UserMenu from './UserMenu';

describe('UserMenu', () => {
  it('should toggle <Sidebar /> when clicking icon', async () => {
    const store = createStore(reducer);
    let testRenderer = {};

    await act(async () => {
      testRenderer = render(
        <Provider store={store}>
          <UserMenu />
        </Provider>,
      );
    });

    const { queryByRole, queryByTestId } = testRenderer;
    const button = queryByRole('button');
    const sidebar = queryByTestId('sidebar');

    expect(sidebar).toBe(null);

    await act(async () => {
      fireEvent.click(button);
    });

    const sidebarOpened = queryByTestId('sidebar');

    expect(sidebarOpened).not.toBe(null);

    await act(async () => {
      fireEvent.click(button);
    });

    const sidebarClosed = queryByTestId('sidebar');

    expect(sidebarClosed).toBe(null);
  });
});
