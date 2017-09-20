let webpack = require("webpack"),
  { setupPath } = require(`./helpers`),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: './src/Main.jsx',

  resolve: {
    extensions: [`.js`, `.jsx`]
  },

  module: {
    // rules for modules (configure loaders, parser options, etc.)
    rules: [
      {
        test: /\.jsx?$/, // both .js and .jsx
        loader: 'eslint-loader',
        //include: resolve(process.cwd(), 'demos/users/src'),
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: setupPath(`../src/index.html`)
    })
  ]
};