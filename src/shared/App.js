import React, { Component } from 'react';

import { Routing } from '@/routing';

import store from './store';

import './assets/scss/styles.scss';

class App extends Component {

  render() {
    return (
      <Routing store={store} />
    );
  }
 
}

export default App;
