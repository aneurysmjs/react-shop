
const paths = require('../paths');

module.exports = {
  extensions: ['.js', '.mjs', '.json', '.jsx', '.css'],
  modules: paths.resolveModules,
  alias: {
    api$: `${paths.srcApp}/api/api.js`,
    '@': paths.srcApp,
    styles: `${paths.srcApp}/assets/scss`,
  },
};
