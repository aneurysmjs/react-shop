// @flow strict
import React from 'react';

import { Routing } from '@/routing';

import store from './store';

import './assets/scss/styles.scss';

const App = () => (
  <Routing store={store} />
);

export default App;
