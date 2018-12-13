const paths = require('./config/paths');

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [paths.srcShared],
    }),
    require('postcss-assets')({
      basePath: './assets',
    }),
  ],
  sourceMap: true,
};
