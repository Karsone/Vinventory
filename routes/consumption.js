var ObjectID = require('mongodb').ObjectID
/*
 * GET consumption listing
 */

exports.list = function(db){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: null,
			consumption : null
		}
		db.collection('consumptions').find().toArray(function(err, items){
			if(err){
				data.isSuccessful = 0;
				data.alertLevel = err;
				data.alertMessages = err;
			}
			data.isSuccessful = 1;
			data.consumption = items;

			res.json(data);
		});
	}
};

 exports.loadByProduct = function(db){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: null,
			consumption : null
		}
		
		db.collection('consumptions').find({"productID": req.params.id}).toArray(function(err, item){
			if(err){
				data.isSuccessful = 0;
				data.alertLevel = err;
				data.alertMessages = err;
			}
			data.isSuccessful = 1;
			data.consumption = item;

			res.json(data);
		});
	}
};

 exports.loadByUser = function(db){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: null,
			consumption : null
		}
		console.log(req.params.userID);
		db.collection('consumptions').find({"userID": req.params.id}).toArray(function(err, item){
			if(err){
				data.isSuccessful = 0;
				data.alertLevel = err;
				data.alertMessages = err;
			}
			data.isSuccessful = 1;
			data.consumption = item;

			res.json(data);
		});
	}
};

 exports.create = function(db){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: null,
			consumption : null
		}


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
					res.json(data);
				});
			} else {
				data.isSuccessful = 0;
				data.alertLevel = "Error";
				data.alertMessage = "Product out of inventory";
				res.json(data);
			}
        })  
		
		db.collection('consumptions').insert(req.body, function(err, item){
			if(err){
				data.isSuccessful = 0;
				data.alertLevel = err;
				data.alertMessages = err;
			}
			data.isSuccessful = 1;
			data.consumption = item;
		});
	}
};