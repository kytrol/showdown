const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { paths, jsEntry } = require('./util');

module.exports = {
  entry: [
    'babel-polyfill',
    jsEntry
  ],
  module: {
    rules: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader?minimize'
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [autoprefixer()]
          }
        },
        {
          loader: 'sass-loader'
        }]
      })
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,
        drop_console: true,
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new ExtractTextPlugin({
      filename: paths.css
    })
  ]
};
