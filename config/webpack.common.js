const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const PrettierPlugin = require('prettier-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
//
const paths = require('./paths');

module.exports = {
  entry: [`${paths.src}/main.js`],

  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: `${paths.src}/template.html`,
      filename: 'index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: `${paths.src}/favicon/favicon.png`,
      favicons: {
        developerURL: false,
      }
    }),
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      formatter: 'table',
    }),
    new PrettierPlugin(),
  ],

  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'] },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
    },
  },
};
