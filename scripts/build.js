const { SCRIPT_TYPE } = require('./utils');
// eslint-disable-next-line import/no-dynamic-require
require(`./build.${SCRIPT_TYPE}`);
