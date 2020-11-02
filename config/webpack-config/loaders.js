// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const generateSourceMap = process.env.OMIT_SOURCEMAP !== 'true';

const jsRegex = /\.(js|mjs|jsx|ts|tsx)$/;
const scssRegex = /\.(sa|sc|c)ss$/;

const babelLoader = {
  test: jsRegex,
  exclude: /node_modules/,
  loader: require.resolve('babel-loader'),
};

const cssLoaderClient = {
  test: scssRegex,
  use: [
    {
      loader: require.resolve('css-hot-loader'),
    },
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
    },
    {
      loader: require.resolve('postcss-loader'),
      // options: {
      //   sourceMap: generateSourceMap,
      // },
      options: {
        // @se https://github.com/webpack-contrib/postcss-loader#postcssoptions
        // @see https://github.com/webpack-contrib/postcss-loader/blob/master/CHANGELOG.md#400-2020-09-07
        postcssOptions: {
          plugins: [require('autoprefixer'), require('precss')],
        },
        sourceMap: generateSourceMap,
      },
    },
    {
      loader: require.resolve('sass-loader'),
    },
  ],
};

const cssLoaderServer = {
  test: scssRegex,
  use: [
    {
      loader: require.resolve('css-loader'),
    },
    {
      loader: require.resolve('sass-loader'),
    },
  ],
};

const urlLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: require.resolve('url-loader'),
  options: {
    limit: 2048,
    name: 'assets/[name].[hash:8].[ext]',
  },
};

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false,
  },
};

const fileLoaderClient = {
  exclude: [/\.(js|css|mjs|html|json)$/],
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'assets/[name].[hash:8].[ext]',
      },
    },
  ],
};

const fileLoaderServer = {
  exclude: [/\.(js|css|mjs|html|json)$/],
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'assets/[name].[hash:8].[ext]',
        emitFile: false,
      },
    },
  ],
};

const client = [
  {
    oneOf: [babelLoader, cssLoaderClient, urlLoaderClient, fileLoaderClient],
  },
];
const server = [
  {
    oneOf: [babelLoader, cssLoaderServer, urlLoaderServer, fileLoaderServer],
  },
];

module.exports = {
  client,
  server,
};
