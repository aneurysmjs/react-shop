const { setupPath } = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: './src/Main.jsx',

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      // A trailing $ can also be added to the given object's keys to signify an exact match:
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
        options: {
          fix: false
        }
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.scss/,
        enforce: 'pre',
        loader: 'import-glob-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
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
            outputPath: 'fonts/',    // where the fonts will go
            publicPath: '../'       // override the default path
          }
        }]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: setupPath('../src/index.html')
    }),
    // copy files and folders to specific paths.
    new CopyWebpackPlugin([{
      // Copy `assets` contents to {output}/assets/
      from: 'src/assets',
      to: 'assets',
      ignore: [
        // Doesn't copy any files with a scss extension
        '*.scss'
      ],
    }])
  ]
};