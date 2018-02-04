"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var env       = process.env.NODE_ENV || 'development';
var Config = require('./config/config')[env];
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use it before all route definitions
require('./routes')(app);


app.listen(Config.PORT, function () {
  console.log(`Grio tech challenge bknd running on port ${Config.PORT}`);
});

module.exports = app;
