const webpack = require('webpack');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');

const baseConfig = require('./client.base');

const generateSourceMap = process.env.OMIT_SOURCEMAP === 'true' ? false : true;

/** @type {import('webpack').Configuration} */
const config = {
  ...baseConfig,
  plugins: [
    new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...baseConfig.plugins,
  ],
  mode: 'development',
  devtool: generateSourceMap ? 'inline-cheap-module-source-map' : false,
  performance: {
    hints: false,
  },
};

module.exports = config;
