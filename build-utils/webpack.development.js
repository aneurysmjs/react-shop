const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const { setupCommonConfig, setupPath } = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const {
  constants: {
    PORT,
  },
} = require('./config');

module.exports = (env) => {
 
  const { pathToProject, pathToCommonConfig } = setupCommonConfig(env);

  const commonConfig = require(pathToCommonConfig)(env);

  const publicPath = `http://localhost:${PORT}`;

  return webpackMerge(commonConfig, {
    cache: true,
    mode: 'development',
    devtool: 'eval',

    output: {
      path: pathToProject,
      publicPath,
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map'
    },

    devServer: {
      // By default it will use your current working directory to serve content,
      // but you can modify this to another directory
      contentBase: pathToProject,
      compress: true,
      port: PORT,
      /**
       * Basically tells the dev-server "hey! if you don't match something here,
       * the browser probable would know what to do with it"
       */
      historyApiFallback: true
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: setupPath('../src/index.html'),
      }),
      new webpack.DllReferencePlugin({
        context: path.join(__dirname, '..'),
        manifest: require('../dll/vendor-manifest.json'),
      }),
      new AddAssetHtmlPlugin([
        {
          filepath: path.resolve(__dirname, '../dll/*.dll.js'),
        }
      ])
    ],

  });

};