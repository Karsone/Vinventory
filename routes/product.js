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
//  exports.loadProduct = function(db){
// 	return function(req, res){
// 		var data = {
// 			isSuccessful: 0,
// 			alertLevel: null,
// 			alertMessages: null,
// 			product : null
// 		}
// 		var id = require('mongodb').ObjectID(req.params.id);
// 		var product = db.collection('products').find({ _id: id });
// 		res.json(product);
// 		// res.json({ dumb: true });

// 		// (function(err, items){
// 		// 	if(err){
// 		// 		data.isSuccessful = 0;
// 		// 		data.alertLevel = err;
// 		// 		data.alertMessages = err;
// 		// 	}
// 		// 	data.isSuccessful = 1;
// 		// 	data.products = items;

// 		// 	res.json(data);
// 		// });
// 	}
// };