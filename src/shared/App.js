import React, { Component } from 'react';

import store from './store';
import { Routing } from 'routing';

import './assets/scss/styles.scss';

class App extends Component {

  render() {
    return (
      <Routing store={store} />
    );
  }

}

export default App;
