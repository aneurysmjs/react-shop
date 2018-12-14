const path = require('path');
const paths = require('../paths');

module.exports = {
  extensions: ['.js', '.mjs', '.json', '.jsx', '.css'],
  modules: paths.resolveModules,
  alias: {
    'api$': `${paths.srcShared}/api/api.js`,
    components: `${paths.srcShared}/components`,
    pages: `${paths.srcShared}/pages`,
    routing: `${paths.srcShared}/routing`,
  }
};
