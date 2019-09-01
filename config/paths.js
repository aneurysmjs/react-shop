// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
  appHtml: resolveApp('config/webpack-config/template.html'),
  clientBuild: resolveApp('build/client'),
  serverBuild: resolveApp('build/server'),
  dotenv: resolveApp('.env'),
  src: resolveApp('src'),
  srcClient: resolveApp('src/client'),
  srcServer: resolveApp('src/server'),
  srcApp: resolveApp('src/app'),
  publicPath: '/static/',
};

paths.resolveModules = [
  paths.srcClient,
  paths.srcServer,
  paths.srcApp,
  paths.src,
  'node_modules',
];

module.exports = paths;
