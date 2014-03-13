var ObjectID = require('mongodb').ObjectID,
	MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

/*
 * GET consumption listing
 */

exports.list = function(){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: '',
			alertMessages: '',
			consumptions : null
		}, mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true});

		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('consumptions').find().toArray(function(err, items) {
		  	if(err){
		  		data.isSuccessful = 0;
		  		data.alertLevel = err;
		  		data.alertMessages = err;
		  	}
		  	data.isSuccessful = 1;
		  	data.consumptions = items;

		    mongoclient.close();

		    res.json(data); 
		  });
		});
	}
};

 exports.loadByProduct = function(){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: '',
			alertMessages: '',
			consumption : null
		}, mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true});

		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('consumptions').find({"productID": req.params.id}).toArray(function(err, item){
		  	if(err){
		  		data.isSuccessful = 0;
		  		data.alertLevel = err;
		  		data.alertMessages = err;
		  	}
		  	data.isSuccessful = 1;
		  	data.consumption = item;

		    mongoclient.close();

		    res.json(data); 
		  });
		});
	}
};

 exports.loadByUser = function(){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: '',
			alertMessages: '',
			consumptions : null
		}, mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true});

		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('consumptions').find({"userID": req.params.id}).toArray(function(err, items){
		  	if(err){
		  		data.isSuccessful = 0;
		  		data.alertLevel = err;
		  		data.alertMessages = err;
		  	}
		  	data.isSuccessful = 1;
		  	data.consumptions = items;

		    mongoclient.close();

		    res.json(data); 
		  });
		});
	}
};

 exports.create = function(){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: '',
			alertMessages: '',
			consumption : null
		}, mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true});

		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('products').find({ "_id": new ObjectID(req.body.productID)}).toArray(function(err, product) { 
		  	if(product[0].count > 0) {
		  		db.collection('products').update({ "_id": new ObjectID(req.body.productID)},{ $inc : { count: -1 } }, function(err, item){
		  			if(err){
		  				data.isSuccessful = 0;
		  				data.alertLevel = err;
		  				data.alertMessages = err;
		  			}
		  			data.isSuccessful = 1;
		  			data.product = item;
		  			
  			  		db.collection('consumptions').insert(req.body, function(err, item){
  						if(err){
  							data.isSuccessful = 0;
  							data.alertLevel = err;
  							data.alertMessages = err;
  						}
  						data.isSuccessful = 1;
  						data.consumption = item;
  					});

		  			res.json(data);
		  		});
		  	} else {
		  		data.isSuccessful = 0;
		  		data.alertLevel = "Error";
		  		data.alertMessages = "Product out of inventory";
		  		res.json(data);
		  	}

		    mongoclient.close();
		  });
		});
	}
};