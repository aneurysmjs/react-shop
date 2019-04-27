const paths = require('./config/paths');

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [paths.srcApp],
    }),
    require('postcss-assets')({
      basePath: './assets',
    }),
  ],
  sourceMap: true,
};
