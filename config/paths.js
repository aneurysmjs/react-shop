/** @module paths */

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

/**
 * @typedef {Object} Paths
 * @property {string} appHtml
 * @property {string} clientBuild
 * @property {string} serverBuild
 * @property {string} dotenv
 * @property {string} src
 * @property {string} srcClient
 * @property {string} srcServer
 * @property {string} srcApp
 * @property {string} publicPath
 * @property {string[]} resolveModules
 */
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

/**
 * @type {Paths}
 */
paths.resolveModules = [paths.srcClient, paths.srcServer, paths.srcApp, paths.src, 'node_modules'];


module.exports = paths;
