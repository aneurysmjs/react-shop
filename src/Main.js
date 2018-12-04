import React, { Component } from 'react';
import ReactDom from 'react-dom';

import App from './containers/App/App';

// import main CSS styles
import './assets/scss/styles.scss';

const app = document.querySelector('#app');

if (app !== null) {
  ReactDom.render(<App />, app);
}

// // Webpack Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./containers/App/App', () => {
//     render(App);
//   });
// }
