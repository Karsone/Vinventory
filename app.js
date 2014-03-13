
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var product = require('./routes/product');
var category = require('./routes/category');
var consumption = require('./routes/consumption');
var report = require('./routes/report');
var http = require('http');
var path = require('path');

// var mongo = require('mongoskin');
// var db = mongo.db("mongodb://vin65-vinventory.cloudapp.net:27017/vinventory", { native_parser: true });

// Trying new database approach
var mongo = require('mongodb');
var mongoCollection = null;
var server = new mongo.Server("vin65-vinventory.cloudapp.net", 27017, { auto_reconnect: true });
var db = new mongo.Db('vinventory', server, {safe: false});
db.open(function(error, databaseConnection) {
	db = databaseConnection;
});


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	res.sendfile('./public/views/index.htm'); // load the single view file (angular will handle the page changes on the front-end)
});

// Product Endpoints
app.get('/products', product.list());
app.get('/product/:id', product.load());
app.post('/product', product.create());
app.put('/product/:id', product.edit());
// app.delete('/product/:id', product.delete());

// Category Endpoints
app.get('/categories', category.list());

// User Endpoints
app.get('/users', user.list());
app.get('/user/:id', user.load());
app.post('/user', user.create());
app.put('/user/:id', user.edit());
app.delete('/user/:id', user.delete());

// Consumption Endpoints
app.get('/consumptions', consumption.list());
app.get('/consumption/product/:id', consumption.loadByProduct());
app.get('/consumption/user/:id', consumption.loadByUser());
app.post('/consumption', consumption.create());

// Reporting Endpoints
app.get('/userReport/user/:id', report.userReport());

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
