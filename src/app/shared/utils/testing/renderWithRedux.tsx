import React, { ReactElement, Component } from 'react';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';

import { render, RenderResult } from '@testing-library/react';
import { State } from '~/shared/types/State';

import reducer from '~/store/reducers';

type WithReduxConfig = {
  initialState?: State;
  store?: Store<State>;
};

export interface RenderWithRedux extends RenderResult {
  store: Store<State>;
}

export default function renderWithRedux(
  ui: ReactElement | Component,
  { initialState, store = createStore(reducer, initialState) }: WithReduxConfig = {},
): RenderWithRedux {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}
