import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ChunkExtractor } from '@loadable/server';

import App from '~/App';
import paths from '../../../config/paths';
import Html from '../components/HTML';

const statsFile = `${paths.serverBuild}/loadable-stats.json`;
const extractor = new ChunkExtractor({ statsFile, entrypoints: ['server'] });

const getAssets = fn => assets => assets.map(fn);

const serverRenderer = () => (req, res) => {
  const { assetPath } = res.locals;
  // 'assetPath' doesn't match Express's mixed value, so we can ignore it
  const getAssetPath = getAssets(assetPath);

  const content = renderToString(
    extractor.collectChunks(
      <Provider store={req.store}>
        <Router location={req.url} context={{}}>
          <App />
        </Router>
      </Provider>,
    ),
  );

  const css = getAssetPath(['bundle.css', 'vendor.css']);
  const scripts = getAssetPath(['bundle.js', 'vendor.js']);

  return res.send(
    `<!doctype html>${renderToString(
      <Html css={css} scripts={[...scripts]}>
        {content}
      </Html>,
    )}`,
  );
};

export default serverRenderer;
