const paths = require('./config/paths');

module.exports = {
  plugins: [
    // eslint-disable-next-line global-require
    require('postcss-import')({
      path: [paths.srcApp],
    }),
    // eslint-disable-next-line global-require
    require('postcss-assets')({
      basePath: './assets',
    }),
  ],
  sourceMap: true,
};
