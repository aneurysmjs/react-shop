const webpack = require('webpack');
const express = require('express');
const chalk = require('chalk');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('../config/webpack-config')(process.env.NODE_ENV || 'development');
const paths = require('../config/paths');
const {
  logMessage,
  makeCompilerPromise,
  findCompiler,
} = require('./utils');

const app = express();

const PORT = process.env.PORT || 8500;

const DEVSERVER_HOST = process.env.DEVSERVER_HOST || 'http://localhost';

(async () => {
  const [clientConfig] = webpackConfig;

  /** @type {import('webpack').Configuration} */
  clientConfig.entry.bundle = [
    `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${PORT}/__webpack_hmr`,
    ...clientConfig.entry.bundle,
  ];

  clientConfig.output.hotUpdateMainFilename = 'updates/[fullhash].hot-update.json';
  clientConfig.output.hotUpdateChunkFilename = 'updates/[id].[fullhash].hot-update.js';

  const webpackCompiler = webpack([clientConfig]);
  const clientCompiler = findCompiler(webpackCompiler)('client');
  const [clientPromise] = makeCompilerPromise([clientCompiler]);

  /**
   * the `watchOptions` was removed, the default value of the watchOptions option is taken
   * from the value of the watchOptions option from the configuration (webpack.config.js)
   * 
   * the `stats` option was removed, the default value of the stats option is taken
   * from the value of the stats option from the configuration (webpack.config.js)
   * 
   * @see https://github.com/webpack/webpack-dev-middleware/blob/master/CHANGELOG.md#breaking-changes
   */
  // const watchOptions = {
  //   ignored: /node_modules/,
  //   stats: clientConfig.stats,
  // };

  app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  });

  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      writeToDisk: true
    }),
  );

  app.use(webpackHotMiddleware(clientCompiler));

  app.use('*', express.static(paths.clientBuild));

  try {
    await clientPromise;

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(
        `[${new Date().toISOString()}]`,
        chalk.blue(
          `App is running: ${process.env.HOST || 'http://localhost'}:${process.env.PORT || 8500}`,
        ),
      );
    });
  } catch (error) {
    logMessage(error, 'error');
  }
})();
