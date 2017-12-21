'use strict';

let { resolve } = require('path');

/**
 * @param {string} folderPath - folder's path
 * @return {string}
 */
exports.setupPath = (folderPath) => resolve(__dirname, `${folderPath}`);

/**
 * sets the configuration paths
 *
 * @param {Object} env
 * @return {string}
 */
exports.setupCommonConfig = (env) => {

  return {
    // specify the path for the common webpack's config
    pathToCommonConfig: './webpack.common.js',
    // specify the project's folder to look for the files
    pathToProject: resolve(__dirname, '../src')
  };

};

/**
 * sets the `production` path
 * @param {Object} env
 * @return {string} the path for the `dist` folder
 */
exports.productionPath = (env) => {
  let pathSetup = '../dist';

  return resolve(__dirname, pathSetup);
};