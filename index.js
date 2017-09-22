'use strict';
var express = require('express');
var app = express();
var parser = require('body-parser');
var path = require('path');
var morgan =require('morgan');
var mJson =require('morgan-json');
var userRoute = require('./server/routes/user');
var bookRoute = require('./server/routes/book');

var format = mJson(':method :url :status :res[content-length] bytes :response-time ms');

app.use(parser.urlencoded({
  extended: true
}));

app.use(parser.json());

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');

app.use(morgan(format));
app.use(express.static(path.join(__dirname, '/public')));

var router = express.Router();
app.use('/api/v1', router);

router.get('/', (req, res) => {
  res.status(200).json({
    'welcome': 'Book One'
  });
});

userRoute(router);
bookRoute(router);

app.use((req, res) => {
  return res.sendFile(__dirname + '/public/index.html');
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port);
module.exports = app;