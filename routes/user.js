var ObjectID = require('mongodb').ObjectID
/*
 * GET users listing
 */
exports.list = function(db){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: null,
			users : null
		}
		db.collection('users').find().toArray(function(err, items){
			if(err){
				data.isSuccessful = 0;
				data.alertLevel = err;
				data.alertMessages = err;
			}
			data.isSuccessful = 1;
			data.users = items;

			res.json(data);
		});
	}
};

/*
 * GET user by ID.
 */
exports.load = function(db){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: null,
			user : null
		}

		db.collection('users').find({"_id": new ObjectID(req.params.id)}).toArray(function(err, item){
			if(err){
				data.isSuccessful = 0;
				data.alertLevel = err;
				data.alertMessages = err;
			}
			data.isSuccessful = 1;
			data.user = item;

			res.json(data);
		});
	}
};