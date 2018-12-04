// webpack.vendor.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    // create two library bundles, one with jQuery and
    // another with Angular and related libraries
    vendor: ['react', 'react-dom'],
  
  },

  output: {
    filename: '[name].dll.js',
    path: path.resolve('./dll'),
    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]',
  },

  plugins: [
    new webpack.DllPlugin({
      path: `${path.resolve('./dll')}/[name]-manifest.json`,
      name: '[name]`'
    }),
  ],
};
