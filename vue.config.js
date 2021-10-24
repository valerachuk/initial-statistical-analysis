const path = require('path');

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  publicPath: './',
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@components', path.resolve('src/components/'))
      .set('@views', path.resolve('src/views/'))
      .set('@math-services', path.resolve('src/math-services/'))
      .set('@constants', path.resolve('src/constants.js'));
  }
};
