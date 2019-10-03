/* eslint-disable no-undef */
import React from 'react';
import { createBrowserHistory } from 'history';
import reactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '~/store';

import App from '~/App';

const browserHistory = window.browserHistory || createBrowserHistory();

const SSR = process.env.RENDER_TYPE === 'ssr';

reactDOM[`${SSR ? 'hydrate' : 'render'}`](
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'),
);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }

  if (!window.browserHistory) {
    window.browserHistory = browserHistory;
  }
}
