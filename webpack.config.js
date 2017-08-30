'use strict';

const webpack = require('webpack');
const path = require('path');

const srcPath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'build');

module.exports = {
  entry: path.join(srcPath, 'script.js'),
  devServer: {
    port: 3001,
    inline: true,
    hot: true,
    compress: true
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'bundle.js',
    path: buildPath,
    publicPath: '/build'
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'stage-0'],
        plugins: [
          ['transform-react-jsx', { pragma: 'h' }]
        ]
      }
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
