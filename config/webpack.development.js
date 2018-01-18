const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const { setupCommonConfig, setupPath } = require('./helpers');

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
//const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});

module.exports = (env) => {

  let { pathToProject, pathToCommonConfig } = setupCommonConfig(env);

  let commonConfig = require(pathToCommonConfig);

  return webpackMerge(commonConfig, {

    devtool: 'source-map',

    output: {
      path: pathToProject,
      publicPath: 'http://localhost:9000/',
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map'
    },

    devServer: {
      // By default it will use your current working directory to serve content,
      // but you can modify this to another directory
      contentBase: pathToProject,
      compress: true,
      port: 9000,
      /**
       * Basically tells the dev-server "hey! if you don't match something here,
       * the browser probable would know what to do with it"
       */
      historyApiFallback: true,
      // enable Hot Module Replacement
      hot: true
    },

    plugins: [
      /**
       * Webpack's Dll and DllReference plugins are a way to split a large JavaScript project into multiple bundles which can
       * be compiled independently. They can be used to optimize build times (both full and incremental) and improve caching
       * for users by putting code which changes infrequently into separate "library" bundles. The term 'Dll' is short for
       * Dynamically Linked Library which is a feature for native Windows applications that solves the same problem.
       *
       * `Webpack Dll Bundle plugin` uses Webpack's DllPlugin & DllReferencePlugin to create bundle configurations as part of
       * the build process. The plugin will monitor for changes in packages and rebuild the bundles accordingly.
       */
      new DllBundlesPlugin({
        bundles: {
          vendor: [
            'react',
            'react-dom',
            'react-router',
            'redux',
            'firebase',
            'react-redux',
            'bootstrap'
          ]
        },
        dllDir: './dll',
        webpackConfig: webpackMerge(commonConfig, {
          devtool: 'cheap-module-source-map',
          plugins: [] // DllBundlesPlugin will set the DllPlugin here
        })
      }),
      /**
       * Currently, the file name templates for dll's is locked, you can get a projected file name for a dll using the
       * `resolveFile` function.
       */
      new AddAssetHtmlPlugin([
        {
          filepath: setupPath(`../dll/${DllBundlesPlugin.resolveFile('vendor')}`)
        }
      ]),
      /**
       * Makes easier to see which dependencies are being patched.
       */
      new webpack.NamedModulesPlugin(),
      /**
       *
       */
      new webpack.HotModuleReplacementPlugin()

    ],

  });

};