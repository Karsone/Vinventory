
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var product = require('./routes/product');
var category = require('./routes/category');
var http = require('http');
var path = require('path');

var mongo = require('mongoskin');
var db = mongo.db("mongodb://vin65-vinventory.cloudapp.net:27017/vinventory", { native_parser: true });

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon());
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
app.get('/products', product.list(db));
app.get('/product/:id', product.load(db));
app.post('/product/create', product.create(db));

// Category Endpoints
app.get('/categories', category.list(db));

// User Endpoints
app.get('/users/list', user.list(db));
app.get('/user/:id/show', user.load(db));
app.post('/user/create', user.create(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
