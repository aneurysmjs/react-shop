const path = require('path');
const paths = require('../paths');

module.exports = {
  extensions: ['.js', '.mjs', '.json', '.jsx', '.css'],
  modules: paths.resolveModules,
  alias: {
    'api$': `${paths.srcShared}/api/api.js`,
    components: `${paths.srcShared}/components`,
    constants: `${paths.srcShared}/constants`,
    pages: `${paths.srcShared}/pages`,
    routing: `${paths.srcShared}/routing`,
    actions: `${paths.srcShared}/store/actions`,
    reducers: `${paths.srcShared}/store/reducers`,
  }
};
