/* eslint-disable @typescript-eslint/ban-ts-ignore */
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
// eslint-disable-next-line import/no-extraneous-dependencies
import path from 'path';
import chalk from 'chalk';
// "express-manifest-helpers" has not compatible Flow version
import manifestHelpers from 'express-manifest-helpers';
import bodyParser from 'body-parser';

import store from '~/store';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import paths from '../../config/paths'; // "paths" isn't been transpiled, so it can be ignored
import serverRender from './middleware/serverRender';
import errorHandler from './middleware/errorHandler';
// "dotenv" has not compatible Flow version
require('dotenv').config();

const app: Application = express();

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
if (process.env.NODE_ENV === 'development') {
  app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)));
  app.use('/favicon.ico', (req: Request, res: Response): void => {
    res.send('');
  });
}

app.use(cors());

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  // "store" doesn't exists on express.Request, so we can just ignore it
  // @ts-ignore
  req.store = store;
  return next();
});

const manifestPath = path.join(paths.clientBuild, paths.publicPath);

app.use(
  manifestHelpers({
    manifestPath: `${manifestPath}/manifest.json`,
  }),
);
// @ts-ignore
app.use(serverRender());

app.use(errorHandler);

app.listen(process.env.PORT || 8500, (): void => {
  // eslint-disable-next-line no-console
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(`App is running: http://localhost:${process.env.PORT || 8500}`),
  );
});

export default app;
