// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const paths = require('../../paths');
const { server: serverLoaders } = require('./../loaders');
const resolvers = require('./../resolvers');
const plugins = require('./../plugins');

module.exports = {
  name: 'server',
  target: 'node',
  entry: {
    server: [path.resolve(paths.srcServer, 'index.tsx')],
  },
  externals: [
    nodeExternals({
      /**
       * we still want imported css from external files to be bundled otherwise 3rd party packages
       * which require us to include their own css would not work properly
       * 
       * `whitelist` is now `allowlist`
       * @see https://github.com/nestjs/nest/issues/5068
       * it fixes: Error: [webpack-node-externals] : Option 'whitelist' is not supported. Did you mean 'allowlist'?
       */
      allowlist: /\.css$/,
    }),
  ],
  output: {
    path: paths.serverBuild,
    filename: 'server.js',
    publicPath: paths.publicPath,
    // libraryTarget: 'commonjs2',
  },
  resolve: { ...resolvers },
  module: {
    rules: serverLoaders,
  },
  plugins: [...plugins.shared, ...plugins.server],
  stats: {
    colors: true,
  },
};
