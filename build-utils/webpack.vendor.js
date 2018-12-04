// webpack.vendor.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    // create two library bundles, one with jQuery and
    // another with Angular and related libraries
    vendor: [
      'axios',
      'intersection-observer',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'react-router',
      'react',
      'redux-thunk',
      'redux'
    ],
  
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
      context: path.resolve(__dirname, '..'),
      path: `${path.resolve('./dll')}/[name]-manifest.json`,
      name: '[name]'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};
