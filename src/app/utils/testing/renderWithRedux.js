// @flow strict
import React from 'react';
import type { Element } from 'react';
import { createStore } from 'redux';
// $FlowFixMe
import { Provider } from 'react-redux';
// $FlowFixMe
import { render } from '@testing-library/react';

import reducer from '@/store/reducers';

type StateStoreType<S> = {
  initialState: S,
  store: *
};

export default function renderWithRedux<T>(
  ui: Element<*>,
  {
    initialState,
    // $FlowIgnore it can be ignore just for testing
    store = createStore(reducer, initialState)
  }: StateStoreType<T> = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}