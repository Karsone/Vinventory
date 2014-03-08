var ObjectID = require('mongodb').ObjectID

/*
 * GET users listing
 */
exports.list = function(db){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
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
			alertMessages: [],
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

/*
 * POST new user
 */
exports.create = function(db){
	return function(req, res){
		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			user : null
		}

		var userData = req.body
		var newUser = {
			"name": null,
			"email": null,
			"imageURL": null,
			"gender": null,
			"birthDate": null,
			"isStocker": 0,
			"isActive": 1
		}

		for (key in userData){
			switch (key){
				case "birthDate":
					if(userData[key]){
						newUser[key] = userData[key];
					}
				case "isStocker":
					if(userData[key]){
						newUser[key] = userData[key];
					}
				case "isActive":
					if(userData[key]){
						newUser[key] = userData[key];
					}
				case "_id":
					break;
				default:
					if(userData[key]){
						newUser[key] = userData[key];
					} else {
						data.isSuccessful = 0;
						data.alertLevel = "dataError";
						data.alertMessages.push(key + " is required");
					}
			}
		}

		db.collection('users').save(newUser, {safe:true}, function(err, item){
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

/*
 * PUT updated user data
 */
exports.edit = function(db){
	return function(req, res){

		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			user : null
		}

		var userData = req.body;
		var updatedUser = {};

		for (key in userData){
			switch (key){
				case "birthDate":
					if(userData[key]){
						updatedUser[key] = userData[key];
					}
				case "isStocker":
					if(userData[key]){
						updatedUser[key] = userData[key];
					}
				case "isActive":
					if(userData[key]){
						updatedUser[key] = userData[key];
					}
				case "_id":
					break;
				default:
					if(userData[key]){
						updatedUser[key] = userData[key];
					} else {
						data.isSuccessful = 0;
						data.alertLevel = "dataError";
						data.alertMessages.push(key + " is required");
					}
			}
		}

		db.collection('users').update({"_id": new ObjectID(req.params.id)}, { $set: updatedUser }, {safe:true}, function(err, item){
			console.log(exports.list(db));
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
}

/*
 * DELETE user by ID
 */
exports.delete = function(db){
	return function(req, res){

		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			users: []
		}

		db.collection('users').remove({"_id": new ObjectID(req.params.id)}, true, function(err, item){
			if(err){
				data.isSuccessful = 0;
				data.alertLevel = err;
				data.alertMessages = err;
			}
			data.isSuccessful = 1;
			data.users = exports.list(db);
			res.json(data);
		});
	}
}