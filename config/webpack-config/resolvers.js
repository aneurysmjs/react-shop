
const paths = require('../paths');

module.exports = {
  extensions: ['.js', '.mjs', '.json', '.jsx', '.css', '.ts', '.tsx'],
  modules: paths.resolveModules,
  alias: {
    api$: `${paths.srcApp}/api/api.tsx`,
    '~': paths.srcApp,
    styles: `${paths.srcApp}/assets/scss`,
    // @link https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977
    'react-dom$': 'react-dom/profiling',
    'scheduler/tracing': 'scheduler/tracing-profiling',
  },
};
