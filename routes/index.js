'use strict';

const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap

router.get('*', (req, res) => {
  res.render('index');
});

module.exports = router;
