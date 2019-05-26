// @flow strict
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
// $FlowFixMe
import { Provider } from 'react-redux';
import type {
  $Request,
  $Response,
  Middleware,
} from 'express';
import App from '@/App';

import Html from './components/HTML';

type GetAssetsType = ((string) => string) => (Array<string>) => Array<string>;

const getAssets: GetAssetsType = (fn) => (assets) => assets.map(fn);

const serverRenderer = (): Middleware => (req: $Request, res: $Response): $Response => {

  const { assetPath } = res.locals;
  // 'assetPath' doesn't match Express's mixed value, so we can ignore it
  // $FlowIgnoreMe
  const getAssetPath = getAssets(assetPath);

  const content = renderToString(
    /* $FlowIgnoreMe */
    <Provider store={req.store}>
      <Router location={req.url} context={{}}>
        <App />
      </Router>
    </Provider>
  );
 
  const css = getAssetPath(['bundle.css', 'vendor.css']);
  const scripts = getAssetPath(['bundle.js', 'vendor.js']);

  return res.send(
    '<!doctype html>' +
    renderToString(
      <Html
        css={css}
        scripts={scripts}
      >
        {content}
      </Html>
    )
  );
};

export default serverRenderer;
