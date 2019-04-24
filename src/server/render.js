import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from '@/App';

import Html from './components/HTML';

const serverRenderer = () => (req, res) => {

  const content = renderToString(
    <Provider store={req.store}>
      <Router location={req.url} context={{}}>
        <App />
      </Router>
    </Provider>
  );

  return res.send(
    '<!doctype html>' +
    renderToString(
      <Html
        css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
        scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
      >
        {content}
      </Html>
    )
  );
  
};

export default serverRenderer;
