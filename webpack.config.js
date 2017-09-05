'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === 'production';

const srcPath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'build');

const baseOpts = {
  context: srcPath,
  name: '[path][name].[ext]',
  publicPath: '../'
};

const fontOpts = (mimetype) => Object.assign({}, baseOpts, { mimetype });

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
  exclude: /node_modules/,
  options: {
    presets: [
      ['env', {
        targets: {
          browsers: ['last 2 versions']
        }
      }]
    ],
    plugins: [
      ['transform-react-jsx', { pragma: 'h' }]
    ]
  }
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

const plugins = [];

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
    }),
    new CopyWebpackPlugin([{
      from: path.join(srcPath, 'template')
    }])
  );
} else {
  rules.push({
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      { loader: 'style-loader?sourceMap'},
      { loader: 'css-loader?sourceMap'},
      { loader: 'sass-loader?sourceMap'}
    ]
  });

  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
}

module.exports = {
  entry: path.join(srcPath, 'js', 'script.js'),
  devServer: {
    compress: true,
    contentBase: buildPath,
    hot: true,
    inline: true,
    port: 3001
  },
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
