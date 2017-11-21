'use strict';

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack/webpack.common');

module.exports = (envOpts) => {
  const { env } = envOpts;
  const envConfig = require(`./webpack/webpack.${envOpts.env}`);

  return webpackMerge(commonConfig(env), envConfig);
};
