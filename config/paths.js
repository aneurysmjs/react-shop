// @flow strict
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

type PathsType = {
  clientBuild: string,
  serverBuild: string,
  dotenv: string,
  src: string,
  srcClient: string,
  srcServer: string,
  srcApp: string,
  publicPath: string,
  resolveModules?: Array<string>
};

const paths: PathsType = {
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
