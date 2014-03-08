var ObjectID = require('mongodb').ObjectID
/*
 * GET User Report
 */

exports.userReport = function(db){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: null,
			report : null
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
					// data.products = exports.list(db);
					// res.json(data);
				});
			} else {
				data.isSuccessful = 0;
				data.alertLevel = "Error";
				data.alertMessage = "Product out of inventory";
				res.json(data);
			}
    })  

		db.collection('consumptions').find({"userID": req.params.id}).toArray(function(err, item){
			if(err){
				data.isSuccessful = 0;
				data.alertLevel = err;
				data.alertMessages = err;
			}
			data.isSuccessful = 1;
			data.consumption = item;
			// res.json(data);
		});
		
	}
};

