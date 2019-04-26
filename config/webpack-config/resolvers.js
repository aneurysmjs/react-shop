
const paths = require('../paths');

module.exports = {
  extensions: ['.js', '.mjs', '.json', '.jsx', '.css'],
  modules: paths.resolveModules,
  alias: {
    'api$': `${paths.srcShared}/api/api.js`,
    '@': paths.srcShared,
    styles: `${paths.srcShared}/assets/scss`,
  }
};
