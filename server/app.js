'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', require('./route-api.js'));
app.use('/',    require('./route-default.js'));

var server = app.listen(9090, function () {
  console.log('Server started and listening at port', server.address().port);
});
