// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const paths = require('../../paths');
const { client: clientLoaders } = require('./../loaders');
const resolvers = require('./../resolvers');
const plugins = require('./../plugins');

/** @type {import('webpack').Configuration} */
module.exports = {
  name: 'client',
  target: 'web',
  entry: {
    bundle: [`${paths.srcClient}/index.tsx`],
  },
  output: {
    path: path.join(paths.clientBuild, paths.publicPath),
    /**
     * @see https://stackoverflow.com/a/42151143/5378393
     */
    filename: '[name].js',
    publicPath: paths.publicPath,
    chunkFilename: '[name].[fullhash].chunk.js',
  },
  module: {
    rules: clientLoaders,
  },
  resolve: { ...resolvers },
  plugins: [...plugins.shared, ...plugins.client],

  optimization: {
    emitOnErrors: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  },
};
