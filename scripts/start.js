const rimraf = require('rimraf');
const paths = require('../config/paths');
const { SCRIPT_TYPE } = require('./utils');

rimraf.sync(paths.clientBuild);
rimraf.sync(paths.serverBuild);
// eslint-disable-next-line import/no-dynamic-require
require(`./start.${SCRIPT_TYPE}`);
