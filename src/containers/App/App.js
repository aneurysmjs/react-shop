import React, { Component } from 'react';

import store from '../../store';
import Root from '../../components/RmRoot/RmRoot';

class App extends Component {

  render() {
    return (
      <Root store={store} />
    );
  }

}

export default App;
