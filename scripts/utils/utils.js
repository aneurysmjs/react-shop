let { join, resolve } = require('path');

const { SRC } = require('../constants');

// root of the project
const ROOT = resolve(__dirname, '../..'); // Movie-search

// templates folder path
const TEMPLATES_PATH = resolve(ROOT, 'scripts/templates') // filia/scripts/templates

/**
 * gets the absolute path where the 'component' folder with the glob pattern
 */
exports.componentPath = join(TEMPLATES_PATH, 'component/**/*.**'); // filia/scripts/templates/component/**/*.**

/**
 * Resolves paths for the folder the developer wants.
 * 
 * @param {string} folderName - the name of the folder
 * @param {string} glob - the glob pattern
 */
exports.resolveFolderPath = (folderName, glob = '') => join(SRC, folderName, glob); // src/{folderName}/{glob}

/**
 * Capitalize a string
 * 
 * @param {string} str - the string to be apply the transformation
 * @return {string}
 */
exports.capitalCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Transform a string to 'dash-case'
 * 
 * @param {string} str - the string to be apply the transformation
 * @return {string}
 */
exports.camelToDashCase = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();