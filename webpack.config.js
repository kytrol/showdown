'use strict';

require('dotenv').config();

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === 'production';

const srcPath = path.join(__dirname, 'src');
const jsPath = path.join(srcPath, 'js');
const buildPath = path.join(__dirname, 'public');

const baseOpts = {
  context: srcPath,
  name: '[path][name].[ext]',
  publicPath: '../'
};

const fontOpts = mimetype => Object.assign({}, baseOpts, { mimetype });

const entry = [];
const rules = [{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  enforce: 'pre',
  use: {
    loader: 'eslint-loader',
    query: {
      configFile: path.join(__dirname, '.eslintrc')
    }
  }
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
}];

const plugins = [
  new CopyWebpackPlugin([{
    from: path.join(jsPath, 'sw.js')
  }])
];

if (isProduction) {
  rules.push({
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
  });

  plugins.push(
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new ExtractTextPlugin({
      filename: path.join('css', 'bundle.css')
    })
  );
} else {
  entry.push('webpack-hot-middleware/client?quiet=true');

  rules.push({
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      { loader: 'style-loader?sourceMap' },
      { loader: 'css-loader?sourceMap' },
      { loader: 'sass-loader?sourceMap' }
    ]
  });

  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
}

entry.push(path.join(jsPath, 'script.js'));

module.exports = {
  entry,
  devtool: isProduction ? false : 'cheap-module-eval-source-map',
  output: {
    filename: path.join('js', 'bundle.js'),
    path: buildPath,
    publicPath: '/'
  },
  module: {
    rules
  },
  plugins
};
