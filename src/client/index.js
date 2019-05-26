// @flow strict
import React from 'react';
import { createBrowserHistory } from 'history';
import { hydrate } from 'react-dom';
// $FlowIgnore
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import store from '@/store';

import App from '@/App';

const browserHistory = window.browserHistory || createBrowserHistory();

hydrate(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  // $FlowIgnore
  document.getElementById('app')
);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }

  if (!window.browserHistory) {
    window.browserHistory = browserHistory;
  }
}
