var ObjectID = require('mongodb').ObjectID

/*
 * GET products listing
 */
exports.list = function(db){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			products : null
		}
		db.collection('products').find().toArray(function(err, items){
			if(err){
				data.isSuccessful = 0;
				data.alertLevel = err;
				data.alertMessages = err;
			}
			data.isSuccessful = 1;
			data.products = items;

			res.json(data);
		});
	}
};

/*
 * GET product by ID
 */
 exports.load = function(db){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			product : null
		}
		
		db.collection('products').find({"_id": new ObjectID(req.params.id)}).toArray(function(err, item){
			if(err){
				data.isSuccessful = 0;
				data.alertLevel = err;
				data.alertMessages = err;
			}
			data.isSuccessful = 1;
			data.product = item;

			res.json(data);
		});
	}
};

/*
 * POST new product
 */
 exports.create = function(db){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			product : null
		}

		var productData = req.body;
		var newProduct = {
			"name": null,
			"imageURL": null,
			"unit": 1,
			"count": 0,
			"abuseMessage": null,
			"isAlcoholic": 0,
		}

		for (key in productData){
			switch (key){
				case "unit":
					if(productData[key].length > 0){
						newProduct[key] = productData[key];
					}
				case "isAlcoholic":
					if(productData[key].length > 0){
						newProduct[key] = productData[key];
					}
				case "count":
					if(productData[key].length > 0){
						newProduct[key] = productData[key];
					}
				case "abuseMessage":
					if(productData[key].length > 0){
						newProduct[key] = productData[key];
					}
				default:
					if(productData[key].length > 0){
						newProduct[key] = productData[key];
					} else {
						data.isSuccessful = 0;
						data.alertLevel = "dataError";
						data.alertMessages.push(key + " is required");
					}
			}
		}
		
		db.collection('products').save(newProduct, {safe:true}, function(err, item){
			if(err){
				data.isSuccessful = 0;
				data.alertLevel = err;
				data.alertMessages = err;
			}
			data.isSuccessful = 1;
			data.product = item;

			res.json(data);
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
		}

		var productData = req.body;
		var updatedProduct = {};

		for (key in productData){
			switch (key){
				case "unit":
					if(productData[key].length > 0){
						updatedProduct[key] = productData[key];
					}
				case "isAlcoholic":
					if(productData[key].length > 0){
						updatedProduct[key] = productData[key];
					}
				case "count":
					if(productData[key].length > 0){
						updatedProduct[key] = productData[key];
					}
				case "abuseMessage":
					if(productData[key].length > 0){
						updatedProduct[key] = productData[key];
					}
				default:
					if(productData[key].length > 0){
						updatedProduct[key] = productData[key];
					} else {
						data.isSuccessful = 0;
						data.alertLevel = "dataError";
						data.alertMessages.push(key + " is required");
					}
			}
		}

		db.collection('products').update({"_id": new ObjectID(req.params.id)}, { $set: updatedProduct }, function(err, item){
			if(err){
				data.isSuccessful = 0;
				data.alertLevel = err;
				data.alertMessages = err;
			}
			data.isSuccessful = 1;
			data.product = item;
			data.products = exports.list(db);

			res.json(data);
		});
	}
}