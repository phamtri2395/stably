/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const { antdRule, sassRule, resourceRule } = require('./rules.webpack');

module.exports = (origConfig, { isServer }) => {
  const config = { ...origConfig };

  /**
   * Common configs
   */
  config.module.rules.push(sassRule, resourceRule);

  /**
   * For SSR only
   *
   * We're using reference config for antd from NextJS
   *    [example](https://github.com/zeit/next.js/blob/canary/examples/with-ant-design-less/next.config.js)
   */
  if (isServer) {
    const externals = [...config.externals];

    config.externals = [
      (context, request, callback) => {
        if (request.match(antdRule.test)) return callback();

        if (typeof externals[0] === 'function') {
          externals[0](context, request, callback);
          return null;
        }

        return callback();
      },

      ...(typeof externals[0] === 'function' ? [] : externals),
    ];

    config.module.rules.push(antdRule);
  }

  return config;
};
