/* global __dirname, process */
var express = require('express');
var db = require('./server/db/db');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.set('views', __dirname + '/client');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});
var port = process.env.PORT || 3000;

app.listen(port);
