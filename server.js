/* global __dirname, process */
var express = require('express');
var db = require('./server/db/db');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.set('views', __dirname + '/client');
app.set('view engine', 'ejs');

require('./server/routes.js')(app, express);

app.get('/', function(req, res) {
  console.log('GOT TO THE / ROUTE');
  res.render('index');
});

var port = process.env.PORT || 3000;

db.sync().then(function () {
  app.listen(port, function () {
    console.log('listening to', port);
  });
});
