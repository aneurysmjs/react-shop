const webpack = require('webpack');
const rimraf = require('rimraf');
const chalk = require('chalk');

const webpackConfig = require('../config/webpack-config')(process.env.NODE_ENV || 'production');
const paths = require('../config/paths');
const {
  logMessage,
  makeCompilerPromise,
  findCompiler,
} = require('./utils');

const buildClient = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  const [clientConfig] = webpackConfig;
  const webpackCompiler = webpack([clientConfig]);
  const clientCompiler = findCompiler(webpackCompiler)('client');
  const [clientPromise] = makeCompilerPromise([clientCompiler]);

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      // eslint-disable-next-line no-console
      console.log(stats.toString(clientConfig.stats));
      return;
    }
    // eslint-disable-next-line no-console
    console.error(chalk.red(stats.compilation.errors));
  });

  // wait until client and server is compiled
  try {
    await clientPromise;
    logMessage('Client build done!', 'info');
    process.exit();
  } catch (error) {
    logMessage(error, 'error');
  }
};

buildClient();
