const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');

const baseConfig = require('./client.base');
const paths = require('../../paths');

const generateSourceMap = process.env.OMIT_SOURCEMAP === 'true';

/** @type {import('webpack').Configuration} */
const config = {
  mode: 'production',
  ...baseConfig,
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  devtool: generateSourceMap ? 'source-map' : false,
  plugins: [
    ...baseConfig.plugins,
    new PurgecssPlugin({
      paths: glob.sync(`${paths.srcApp}/**/*`, { nodir: true }),
    }),
  ],
};

config.output.filename = 'bundle.[chunkhash].js';

module.exports = config;
