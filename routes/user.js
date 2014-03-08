
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
		console.log(req.body);

		var data = {
			isSuccessful: 0,
			alertLevel: null,
			alertMessages: [],
			user : null
		}

		var userData = {"name":"test 123","email":"test@vin65.com","imageURL":"/images/userPhotos/thumbnails/Test.jpg","gender":"other","isStocker":0,"isActive":1}
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
					if(newUser[key].length > 0){
						newUser[key] = userData[key];
					}
				case "isStocker":
					if(newUser[key].length > 0){
						newUser[key] = userData[key];
					}
				case "isActive":
					if(newUser[key].length > 0){
						newUser[key] = userData[key];
					}
				default:
					if(userData[key].length > 0){
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