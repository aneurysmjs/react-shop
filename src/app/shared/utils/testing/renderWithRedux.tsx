import { Element } from React from 'react';

import { createStore } from 'redux';
// $FlowFixMe
import { Provider } from 'react-redux';
// $FlowFixMe
import { render } from '@testing-library/react';

import reducer from '~/store/reducers';

export default function renderWithRedux(
  ui: JSX.Element,

  { initialState, store = createStore(reducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}
