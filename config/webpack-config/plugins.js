// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const { clientOnly } = require('../../scripts/utils');
const paths = require('../paths');
const env = require('../env')();

const shared = [

];

const client = [
  clientOnly() && new HtmlWebpackPlugin({
    filename: path.join(paths.clientBuild, 'index.html'),
    inject: true,
    template: paths.appHtml,
  }),
  new CaseSensitivePathsPlugin(),
  new webpack.DefinePlugin(env.stringified),
  new webpack.DefinePlugin({
    __SERVER__: 'false',
    __CLIENT__: 'true',
  }),
  new MiniCssExtractPlugin({
    filename:
      process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[contenthash].css',
    chunkFilename:
      process.env.NODE_ENV === 'development' ? '[id].css' : '[id].[contenthash].css',
  }),
  new ManifestPlugin({ fileName: 'manifest.json' }),
].filter(Boolean);

const server = [
  new LoadablePlugin(),
  new webpack.DefinePlugin({
    __SERVER__: 'true',
    __CLIENT__: 'false',
  }),
];

module.exports = {
  shared,
  client,
  server,
};
