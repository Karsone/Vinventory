var ObjectID = require('mongodb').ObjectID

/*
 * GET products listing
 */
exports.list = function(db){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: null,
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
			alertMessages: null,
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
 * GET create product
 */
 exports.create = function(db){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: null,
			product : null
		}
		
		db.collection('products').insert(req.body, function(err, item){
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