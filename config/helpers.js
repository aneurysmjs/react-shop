'use strict';

let { resolve } = require('path');

/**
 * @param {string} folderPath - folder's path
 * @return {string}
 */
exports.setupPath = (folderPath) => {
  return resolve(__dirname, `${folderPath}`);
};

/**
 * sets the configuration paths for `src` or `demos`
 * @param {Object} env 
 * @return {string} the path for the `dist` folder of `src` or `demos`
 */
exports.setupCommonConfig = (env) => {

  let pathSetup = (env.demo) ? `../demos/${env.demo}/src` : `../src`;

  return {
    // specify the path for the common webpack's config
    pathToCommonConfig: (env.demo) ? `./demos/webpack.${env.demo}.common.js` : `./webpack.common.js`,
    // specify the project's folder to look for the files
    pathToProject: resolve(__dirname, pathSetup)
  }

};

/**
 * sets the `production` path for `src` or `demos`
 * @param {Object} env 
 * @return {string} the path for the `dist` folder of `src` or `demos`
 */
exports.productionPath = (env) => {
  let pathSetup = (env.demo) ? `../demos/${env.demo}/dist` : `../dist`;

  return resolve(__dirname, pathSetup);
};

/**
 * requires the correct webpack.config file based on the `env` variable
 * because this project has the src which is the react school and the demos
 * which are for demonstration purposes, so is better to delegate all that
 * to webpack.
 * 
 * @param {Object | string} env - determines how the webpack.config files are required.
 * @return {Object} - the webpack configuration file which is going to be use.
 */
exports.buildConfig = (env) => {
 
  let path = ((env) => {
    if (typeof env === 'object' && env.hasOwnProperty('demo') && env.ENV !== '') {
      return `./webpack.${env.ENV}.js`;
    } else {
      return `./webpack.${env}.js`;
    }
  })(env);

  return require(path)(env);
};