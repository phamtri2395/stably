/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

const withPlugins = require('next-compose-plugins');
const withLess = require('@zeit/next-less');
const withSass = require('@zeit/next-sass');

const webpackConfig = require('./webpack.config');
const buildtimeConfig = require('./config.buildtime');
const runtimeConfig = require('./config.runtime');

const nextConfig = {
  /** apply [webpack](https://nextjs.org/docs#customizing-webpack-config) custom config */
  webpack: webpackConfig,
  /** apply [build-time](https://nextjs.org/docs#build-time-configuration) config */
  env: buildtimeConfig,
  /** apply [run-time](https://nextjs.org/docs#runtime-configuration) config */
  ...runtimeConfig,
};

/**
 * Compile Ant-design's styles during
 *    [compilation time](https://github.com/ant-design/babel-plugin-import#-libraryname-antd-style-true-)
 * Ant-design is not currently support cssModules, so we won't config it here
 *
 * Official example:
 *    [with-ant-design-less](https://github.com/zeit/next.js/blob/canary/examples/with-ant-design-less/next.config.js)
 */
const less = [
  withLess,
  {
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
  },
];

/**
 * We use SASS as our css preprocessor, any custom css should be written in SASS
 * Using [cssModules](https://github.com/zeit/next-plugins/tree/master/packages/next-sass#with-css-modules-and-options)
 *
 * TODO: consider using [PostCSS](https://github.com/zeit/next-plugins/tree/master/packages/next-sass#postcss-plugins)
 */
const sass = [
  withSass,
  {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
  },
];

/** [Compose plugins](https://github.com/cyrilwanner/next-compose-plugins) together & export config */
module.exports = withPlugins([less, sass], nextConfig);
