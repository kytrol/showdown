'use strict';

require('dotenv').config();

const debug = require('debug')(process.env.DEBUG + ':app');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const routes = require('./routes');
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  const webpack = require('webpack');
  const config = require('./webpack.config')({ env: 'development' });
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  debug(`App listening on ${port}`);
});

app.use((err, req, res, next) => {
  if (err) {
    console.error('error', err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

module.exports = app;
