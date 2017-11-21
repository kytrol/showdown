const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { paths } = require('./util');

const baseOpts = mimetype => ({
  context: paths.src,
  name: '[path][name].[ext]',
  publicPath: '../',
  mimetype
});

const fontOpts = mimetype => baseOpts(mimetype);

module.exports = env => ({
  output: {
    filename: paths.js('bundle'),
    path: paths.build,
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'eslint-loader',
    },
    {
      test: /\.jsx?/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.woff2?$/,
      use: {
        loader: 'file-loader',
        options: fontOpts('application/font-[ext]')
      }
    },
    {
      test: /\.[ot]tf$/,
      use: {
        loader: 'file-loader',
        options: fontOpts('application/octet-stream')
      }
    },
    {
      test: /\.eot$/,
      use: {
        loader: 'file-loader',
        options: fontOpts('application/vnd.ms-fontobject'),
      }
    },
    {
      test: /\.svg$/,
      use: [{
        loader: 'file-loader',
        options: fontOpts('image/svg+xml')
      },
      {
        loader: 'img-loader'
      }]
    }]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: paths.sw
    }]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    })
  ]
});
