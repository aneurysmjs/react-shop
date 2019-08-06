const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const baseConfig = require('./client.base');

const generateSourceMap = process.env.OMIT_SOURCEMAP === 'true';

const config = {
  mode: 'production',
  ...baseConfig,
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  devtool: generateSourceMap ? 'source-map' : false,
};

config.output.filename = 'bundle.[hash:8].js';

module.exports = config;
