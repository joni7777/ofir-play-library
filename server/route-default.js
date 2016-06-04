'use strict';

var express = require('express'),
    router = express.Router();

router.get('*', function (req, res) {
  res.send([
    '<div style="margin: 50px;text-align: center;">',
      '<h1 style="font-family:Arial,sans-serif;">Don\'t try too hard to be something your\'re not.</h1>',
      '<img src="https://www.placecage.com/300/300" style="border-radius:50%;">',
    '</div>'
  ].join(''));
});

module.exports = router;
