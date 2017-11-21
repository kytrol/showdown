const webpack = require('webpack');
const { jsEntry } = require('./util');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?quiet=true',
    jsEntry
  ],
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        { loader: 'style-loader?sourceMap' },
        { loader: 'css-loader?sourceMap' },
        { loader: 'sass-loader?sourceMap' }
      ]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
