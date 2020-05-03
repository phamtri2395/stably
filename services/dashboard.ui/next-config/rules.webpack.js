/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

const antdStyles = /antd\/.*?\/style.*?/;
const sassStyles = /\.scss$/;

exports.antdRule = {
  enforce: 'pre',
  test: antdStyles,
  use: 'null-loader',
};

/**
 * Load `pre-defined variables` into every SASS file: https://github.com/shakacode/sass-resources-loader
 */
exports.sassRule = {
  test: sassStyles,
  loader: 'sass-resources-loader',
  options: {
    resources: [
      path.resolve(__dirname, '../src/commons/styles/colors.scss'),
      path.resolve(__dirname, '../src/commons/styles/sizes.scss'),
      path.resolve(__dirname, '../src/commons/styles/mixins.scss'),
    ],
  },
};

/**
 * Transform resources into Base64 URI: https://github.com/webpack-contrib/url-loader
 */
exports.resourceRule = {
  test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
  loader: 'url-loader',
  options: {
    limit: 100000,
    name: '[name].[ext]',
  },
};
