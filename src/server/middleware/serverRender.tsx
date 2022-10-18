/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { ChunkExtractor } from '@loadable/server';

import App from '~/App';
// @ts-ignore
import paths from '../../../config/paths';
import Html from '../components/HTML';

const statsFile = `${paths.serverBuild}/loadable-stats.json`;
const extractor = new ChunkExtractor({ statsFile, entrypoints: ['server'] });

// @ts-ignore
const getAssets = (fn) => (assets) => assets.map(fn); // eslint-disable-line @typescript-eslint/explicit-function-return-type

type Req = Request;

const serverRenderer = () => (req: Req, res: Response): Response => {
  const { assetPath } = res.locals;
  // 'assetPath' doesn't match Express's mixed value, so we can ignore it
  const getAssetPath = getAssets(assetPath);

  const content: string = renderToString(extractor.collectChunks(<App />));

  const css = getAssetPath(['bundle.css', 'vendor.css']);
  const scripts = getAssetPath(['bundle.js', 'vendor.js']);

  return res.send(
    `<!doctype html>${renderToString(
      <Html css={css} scripts={[...scripts]}>
        {/* @ts-ignore */}
        {content}
      </Html>,
    )}`,
  );
};

export default serverRenderer;
