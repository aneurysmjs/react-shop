const path = require('path');
const paths = require('../paths');

module.exports = {
  extensions: ['.js', '.mjs', '.json', '.jsx', '.css'],
  modules: paths.resolveModules,
  alias: {
    'api$': path.resolve(__dirname, '../../src/shared/api/api.js'),
  }
};
