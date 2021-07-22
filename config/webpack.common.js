const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
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
      title: 'CSS Hero 2',
      template: `${paths.src}/template.html`,
      filename: 'index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: `${paths.src}/favicon/favicon.png`,
      favicons: {
        developerURL: false,
        icons: {
          android: [
            'android-chrome-36x36.png',
            'android-chrome-144x144.png',
            'android-chrome-512x512.png',
          ],
          appleIcon: [
            'apple-touch-icon.png',
            'apple-touch-icon-57x57.png',
            'apple-touch-icon-152x152.png',
            'apple-touch-icon-1024x1024.png',
          ],
          appleStartup: [
            'apple-touch-startup-image-640x1136.png',
            'apple-touch-startup-image-1668x2224.png',
            'apple-touch-startup-image-2388x1668.png',
          ],
          coast: ['coast-228x228.png'],
          favicons: [
            'favicon-16x16.png',
            'favicon-32x32.png',
            'favicon-48x48.png',
            'favicon.ico',
          ],
          firefox: [
            'firefox_app_60x60.png',
            'firefox_app_128x128.png',
            'firefox_app_512x512.png',
          ],
          windows: [
            'mstile-70x70.png',
            'mstile-150x150.png',
            'mstile-310x150.png',
            'mstile-310x310.png',
          ],
          yandex: ['yandex-browser-50x50.png'],
        },
      },
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
      '@lib': `${paths.src}/lib`,
      '@images': `${paths.src}/assets/images`,
      '@components/common': `${paths.src}/components/common`,
    },
  },
};
