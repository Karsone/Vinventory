var ObjectID = require('mongodb').ObjectID,
	MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

/*
 * GET products listing
 */
exports.list = function(){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			products : null
		}, mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true});

		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('products').find({}, { 'sort': 'displayOrder' }).toArray(function(err, items) {
		  	if(err){
		  		data.isSuccessful = 0;
		  		data.alertLevel = err;
		  		data.alertMessages = err;
		  	}
		  	data.isSuccessful = 1;
		  	data.products = items;

		    mongoclient.close();

		    res.json(data); 
		  });
		});
	}
};

/*
 * GET product by ID
 */
 exports.load = function(){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			product : null
		}, mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true});
		
		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('products').find({"_id": new ObjectID(req.params.id)}).toArray(function(err, item) {
		  	if(err){
		  		data.isSuccessful = 0;
		  		data.alertLevel = err;
		  		data.alertMessages = err;
		  	}
		  	data.isSuccessful = 1;
		  	data.product = item;

		    mongoclient.close();

		    res.json(data); 
		  });
		});
	}
};

/*
 * POST new product
 */
 exports.create = function(){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			product : null
		}, 
		mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true}),
		productData = req.body,
		newProduct = {
			"name": null,
			"imageURL": null,
			"unit": 1,
			"count": 0,
			"displayOrder": 1,
			"abuseMessage": null,
			"isAlcoholic": 0,
		}

		for (key in productData){
			switch (key){
				case "unit":
					if(productData[key]){
						newProduct[key] = productData[key];
					}
				case "isAlcoholic":
					if(productData[key]){
						newProduct[key] = productData[key];
					}
				case "count":
					if(productData[key]){
						newProduct[key] = productData[key];
					}
				case "displayOrder":
					if(productData[key]){
						newProduct[key] = productData[key];
					}
				case "abuseMessage":
					if(productData[key]){
						newProduct[key] = productData[key];
					}
				case "_id":
					break;
				default:
					if(productData[key]){
						newProduct[key] = productData[key];
					} else {
						data.isSuccessful = 0;
						data.alertLevel = "dataError";
						data.alertMessages.push(key + " is required");
					}
			}
		}

		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('products').save(newProduct, {safe:true}, function(err, item) {
		  	if(err){
		  		data.isSuccessful = 0;
		  		data.alertLevel = err;
		  		data.alertMessages = err;
		  	}
		  	data.isSuccessful = 1;
		  	data.product = item;

		    mongoclient.close();

		    res.json(data); 
		  });
		});
	}
};

/*
 * PUT updated product data
 */
exports.edit = function(db){
	return function(req, res){

		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			product : null
		}, 
		mongoclient = new MongoClient(new Server("vin65-vinventory.cloudapp.net", 27017), {native_parser: true}),
		productData = req.body,
		updatedProduct = {};

		for (key in productData){
			switch (key){
				case "unit":
					if(productData[key]){
						updatedProduct[key] = productData[key];
					}
				case "isAlcoholic":
					if(productData[key]){
						updatedProduct[key] = productData[key];
					}
				case "count":
					if(productData[key]){
						updatedProduct[key] = productData[key];
					}
				case "displayOrder":
					if(productData[key]){
						updatedProduct[key] = productData[key];
					}
				case "abuseMessage":
					if(productData[key]){
						updatedProduct[key] = productData[key];
					}
				case "_id":
					break;
				default:
					if(productData[key]){
						updatedProduct[key] = productData[key];
					} else {
						data.isSuccessful = 0;
						data.alertLevel = "dataError";
						data.alertMessages.push(key + " is required");
					}
			}
		}

		mongoclient.open(function(err, mongoclient) {
		  var db = mongoclient.db("vinventory");
		  db.collection('products').update({"_id": new ObjectID(req.params.id)}, { $set: updatedProduct }, { 'safe': true }, function(err, item) {
		  	if(err){
		  		data.isSuccessful = 0;
		  		data.alertLevel = err;
		  		data.alertMessages = err;
		  	}
		  	data.isSuccessful = 1;
			data.product = item;
			data.products = exports.list(db);

		    mongoclient.close();

		    res.json(data); 
		  });
		});
	}
}