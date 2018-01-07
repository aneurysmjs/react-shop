import React, { Component } from 'react';
import ReactDom from 'react-dom';

// store
import store from './store';

// import main CSS styles
import './assets/scss/styles.scss';

import Root from './components/RmRoot/RmRoot';

class MainComponent extends Component {

  render() {
    return (
      <Root store={store} />
    );
  }
  
}

ReactDom.render(<MainComponent />, document.querySelector('#app'));