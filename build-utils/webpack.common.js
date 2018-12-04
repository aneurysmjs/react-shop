const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const { setupPath } = require('./helpers');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const progressHandler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  console.info(percentage, message, ...args);
};

module.exports = (mode) => {
  const prodMode = mode === 'production';
  return {

    entry: ['./src/Main.js'],

    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'api$': setupPath('../src/api/api.js'),
        Components: setupPath('../src/components'),
        Containers: setupPath('../src/containers'),
      }
    },

    module: {
      // rules for modules (configure loaders, parser options, etc.)
      rules: [
        {
          test: /\.jsx?$/, // both .js and .jsx
          loader: 'eslint-loader',
          enforce: 'pre',
          exclude: /node_modules/,
          include: [
            path.join(__dirname, '..', 'src') //important for performance!
          ],
          options: {
            fix: false
          }
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: [
            path.join(__dirname, '..', 'src') //important for performance!
          ],
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              }
            }
          ]
        },
        {
          test: /\.scss/,
          enforce: 'pre',
          loader: 'import-glob-loader'  
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: prodMode ? MiniCssExtractPlugin.loader : 'style-loader',
            },
            {
              loader: 'css-loader'
            },
            // {
            //   loader: 'postcss-loader', // Run post css actions
            //   options: {
            //     plugins() { // post css plugins, can be exported to postcss.config.js
            //       return [
            //         require('precss'),
            //         require('autoprefixer')
            //       ];
            //     }
            //   }
            // },
            {
              loader: 'sass-loader'
            }
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          include: [
            path.join(__dirname, '..', 'src') //important for performance!
          ],
          use: [
            {
              loader: 'file-loader?name=assets/img/[name].[ext]'
            }
          ]
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/', // where the fonts will go
            }
          }]
        },
      ]
    },
    plugins: [
      new webpack.ProgressPlugin(progressHandler),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: prodMode ? '[name].[hash].css' : '[name].css',
        chunkFilename: prodMode ? '[id].[hash].css' : '[id].css',
      }),
      
      // copy files and folders to specific paths.
      // new CopyWebpackPlugin([{
      //   // Copy `assets` contents to {output}/assets/
      //   from: 'src/assets',
      //   to: 'assets',
      //   ignore: [
      //     // Doesn't copy any files with a scss extension
      //     '*.scss'
      //   ],
      // }])
    ]
  };
};