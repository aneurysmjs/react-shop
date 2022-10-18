import React from 'react';
import { createBrowserHistory } from 'history';
import { createRoot } from 'react-dom/client';
import App from '~/App';

const browserHistory = window.browserHistory || createBrowserHistory();

const SSR = process.env.RENDER_TYPE === 'ssr';

// reactDOM[`${SSR ? 'hydrate' : 'render'}`](<App />, document.getElementById('app'));

const app = document.querySelector('#app');

console.log('app', app);

if (app) {
  const root = createRoot(app);
  root.render(<App />);
}

// if (process.env.NODE_ENV === 'development') {
//   if (module.hot) {
//     module.hot.accept();
//   }

//   if (!window.browserHistory) {
//     window.browserHistory = browserHistory;
//   }
// }
